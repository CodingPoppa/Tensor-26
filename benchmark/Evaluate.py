"""
evaluate.py
-----------
Reads dataset.json and results.json, then calculates:
  - Accuracy         : how often the scanner caught real vulnerabilities
  - False Positive Rate : how often it raised an alarm on safe code

How to run:
    python benchmark/evaluate.py
"""

import json   # for reading JSON files

# ── Configuration ──────────────────────────────────────────────────────────────

DATASET_PATH = "benchmark/dataset.json"
RESULTS_PATH = "benchmark/results.json"


# ── Helper: load a JSON file ───────────────────────────────────────────────────

def load_json(path):
    """Open a JSON file and return its contents."""
    with open(path, "r") as f:
        return json.load(f)


# ── Helper: did the API predict any vulnerability? ─────────────────────────────

def has_prediction(result):
    """
    Return True if the API returned at least one finding.

    The findings list is stored in result["predicted_findings"].
    An empty list means the scanner found nothing.
    """
    findings = result.get("predicted_findings", [])
    return len(findings) > 0


# ── Helper: is this test case a 'safe code' case? ─────────────────────────────

def is_safe_case(result):
    """
    Return True when the expected vulnerability is 'None'.
    These are the safe-code test cases — the scanner should NOT flag them.
    """
    expected = result.get("expected_vulnerability", "None")
    return expected.strip().lower() == "none"


# ── Helper: is this a 'vulnerable code' case? ─────────────────────────────────

def is_vulnerable_case(result):
    """Return True when the test case actually contains a vulnerability."""
    return not is_safe_case(result)


# ── Main evaluation logic ──────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  Vulnerability Scanner — Evaluation Report")
    print("=" * 60)

    # ── Step 1: Load files ─────────────────────────────────────────

    print(f"\n[1] Loading dataset  : {DATASET_PATH}")
    dataset = load_json(DATASET_PATH)

    print(f"[2] Loading results  : {RESULTS_PATH}")
    results = load_json(RESULTS_PATH)

    total = len(results)
    print(f"\n    Total test cases  : {total}\n")

    # ── Step 2: Categorise every result ───────────────────────────

    # Counters
    correct_detections  = 0   # vulnerable + scanner flagged   → TRUE POSITIVE
    missed_detections   = 0   # vulnerable + scanner missed    → FALSE NEGATIVE
    false_positives     = 0   # safe code  + scanner flagged   → FALSE POSITIVE
    true_negatives      = 0   # safe code  + scanner silent    → TRUE NEGATIVE

    # We'll also keep per-result detail for the table
    rows = []

    for result in results:
        tc_id    = result["id"]
        expected = result["expected_vulnerability"]
        predicted = has_prediction(result)   # True / False
        safe     = is_safe_case(result)

        if safe:
            # ── Safe code test case ──
            if predicted:
                # Scanner raised an alarm on safe code — FALSE POSITIVE
                false_positives += 1
                verdict = "FALSE POSITIVE"
            else:
                # Scanner correctly stayed quiet — TRUE NEGATIVE
                true_negatives += 1
                verdict = "TRUE NEGATIVE"
        else:
            # ── Vulnerable code test case ──
            if predicted:
                # Scanner caught the vulnerability — CORRECT
                correct_detections += 1
                verdict = "CORRECT (True Positive)"
            else:
                # Scanner missed the vulnerability — MISSED
                missed_detections += 1
                verdict = "MISSED (False Negative)"

        rows.append({
            "id":       tc_id,
            "expected": expected,
            "flagged":  "YES" if predicted else "NO",
            "verdict":  verdict
        })

    # ── Step 3: Calculate metrics ──────────────────────────────────

    vulnerable_cases = correct_detections + missed_detections   # total real vulns
    safe_cases       = false_positives + true_negatives          # total safe cases

    # Accuracy = (cases where scanner was RIGHT) / total cases × 100
    # "Right" means: caught a real vuln OR correctly stayed quiet on safe code
    correct_total = correct_detections + true_negatives
    accuracy = (correct_total / total * 100) if total > 0 else 0.0

    # False Positive Rate = FP / (FP + TN) × 100
    # "Of all the safe-code cases, how many did the scanner wrongly flag?"
    fp_rate = (false_positives / safe_cases * 100) if safe_cases > 0 else 0.0

    # Detection Rate = TP / (TP + FN) × 100   (bonus metric)
    detection_rate = (correct_detections / vulnerable_cases * 100) if vulnerable_cases > 0 else 0.0

    # ── Step 4: Print the per-case table ──────────────────────────

    print("-" * 60)
    print(f"  {'ID':<8} {'Expected':<30} {'Flagged':<8} Verdict")
    print("-" * 60)

    for row in rows:
        print(f"  {row['id']:<8} {row['expected']:<30} {row['flagged']:<8} {row['verdict']}")

    # ── Step 5: Print summary metrics ─────────────────────────────

    print("\n" + "=" * 60)
    print("  SUMMARY METRICS")
    print("=" * 60)
    print(f"  Total test cases        : {total}")
    print(f"  Vulnerable cases        : {vulnerable_cases}")
    print(f"  Safe cases              : {safe_cases}")
    print()
    print(f"  True Positives (caught) : {correct_detections}")
    print(f"  False Negatives (missed): {missed_detections}")
    print(f"  True Negatives (quiet)  : {true_negatives}")
    print(f"  False Positives (noise) : {false_positives}")
    print()
    print(f"  Accuracy                : {accuracy:.1f}%")
    print(f"  False Positive Rate     : {fp_rate:.1f}%   (target: < 15%)")
    print(f"  Detection Rate          : {detection_rate:.1f}%")
    print("=" * 60)

    # ── Step 6: Pass / Fail verdict ───────────────────────────────

    print("\n  HACKATHON TARGETS:")
    fp_ok  = fp_rate <= 15.0
    acc_ok = accuracy >= 70.0

    print(f"  False Positive Rate ≤ 15% : {'PASS' if fp_ok  else 'FAIL'}  ({fp_rate:.1f}%)")
    print(f"  Accuracy ≥ 70%            : {'PASS' if acc_ok else 'FAIL'}  ({accuracy:.1f}%)")

    if fp_ok and acc_ok:
        print("\n  Overall Result: PASS — scanner meets benchmark criteria!")
    else:
        print("\n  Overall Result: FAIL — scanner needs improvement.")

    print("=" * 60)


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    main()