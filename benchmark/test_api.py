"""
test_api.py
-----------
Reads test cases from dataset.json, sends each one to the
vulnerability scanner API, and saves all results to results.json.

How to run:
    python benchmark/test_api.py
"""

import json       # for reading/writing JSON files
import requests   # for sending HTTP requests to the API

# ── Configuration ──────────────────────────────────────────────────────────────

# Path to the test dataset
DATASET_PATH = "benchmark/dataset.json"

# Path where we will save the API results
RESULTS_PATH = "benchmark/results.json"

# The API endpoint we are testing
API_URL = "http://localhost:8000/api/scan"


# ── Helper: load dataset ───────────────────────────────────────────────────────

def load_dataset(path):
    """Open and return the list of test cases from dataset.json."""
    with open(path, "r") as f:
        return json.load(f)


# ── Helper: call the API ───────────────────────────────────────────────────────

def call_scan_api(language, diff):
    """
    Send one code diff to the scan API.

    Returns:
        dict  – the JSON response from the API  (on success)
        None  – if the server is not running or an error occurred
    """
    payload = {
        "language": language,
        "diff": diff
    }

    try:
        # Send POST request, wait up to 30 seconds for a response
        response = requests.post(API_URL, json=payload, timeout=30)

        # Raise an exception for HTTP error codes (4xx, 5xx)
        response.raise_for_status()

        # Parse and return the JSON body
        return response.json()

    except requests.exceptions.ConnectionError:
        # Server is not running at all
        print(f"  [ERROR] Cannot connect to API at {API_URL}.")
        print("          Make sure the server is running first.")
        return None

    except requests.exceptions.Timeout:
        print("  [ERROR] Request timed out. The server took too long to respond.")
        return None

    except requests.exceptions.HTTPError as e:
        print(f"  [ERROR] API returned an error: {e}")
        return None

    except Exception as e:
        # Catch anything else unexpected
        print(f"  [ERROR] Unexpected error: {e}")
        return None


# ── Helper: extract findings from API response ─────────────────────────────────

def extract_findings(api_response):
    """
    Pull the list of vulnerability findings out of the API response.

    We try a few common response shapes:
      { "findings": [...] }          ← most common
      { "vulnerabilities": [...] }
      [ {...}, {...} ]               ← response is already a list

    Returns a list (empty list if nothing found or API failed).
    """
    if api_response is None:
        return []

    # If the response itself is a list, use it directly
    if isinstance(api_response, list):
        return api_response

    # Try common key names
    for key in ("findings", "vulnerabilities", "results", "data"):
        if key in api_response:
            value = api_response[key]
            if isinstance(value, list):
                return value

    # Couldn't find a list — return the raw response wrapped in a list
    # so we don't lose data
    return [api_response]


# ── Main flow ──────────────────────────────────────────────────────────────────

def main():
    print("=" * 55)
    print("  Vulnerability Scanner — Benchmark Test Runner")
    print("=" * 55)

    # Step 1: Load all test cases
    print(f"\n[1] Loading dataset from '{DATASET_PATH}' ...")
    test_cases = load_dataset(DATASET_PATH)
    print(f"    Found {len(test_cases)} test case(s).\n")

    results = []  # We will collect one result dict per test case

    # Step 2: Loop through every test case and call the API
    for i, test in enumerate(test_cases, start=1):
        tc_id       = test["id"]
        language    = test["language"]
        diff        = test["diff"]
        expected    = test["expected_vulnerability"]

        print(f"[{i}/{len(test_cases)}] Running {tc_id} — expected: {expected}")

        # Call the API
        api_response = call_scan_api(language, diff)

        # Extract findings from whatever the API returned
        findings = extract_findings(api_response)

        # Build a result record
        result = {
            "id":                    tc_id,
            "description":           test.get("description", ""),
            "language":              language,
            "expected_vulnerability": expected,
            "expected_owasp":        test.get("owasp_category", "None"),
            "expected_severity":     test.get("severity", "None"),
            "api_response":          api_response,          # full raw response
            "predicted_findings":    findings,               # extracted list
            "api_called":            api_response is not None
        }

        results.append(result)

        # Quick status line
        if api_response is not None:
            count = len(findings)
            print(f"    API responded. Findings returned: {count}")
        else:
            print("    API call failed — recorded as no findings.")

    # Step 3: Save all results to results.json
    print(f"\n[3] Saving results to '{RESULTS_PATH}' ...")
    with open(RESULTS_PATH, "w") as f:
        json.dump(results, f, indent=2)

    print(f"    Done! {len(results)} result(s) saved.")
    print("\nNext step: run  python benchmark/evaluate.py")
    print("=" * 55)


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    main()