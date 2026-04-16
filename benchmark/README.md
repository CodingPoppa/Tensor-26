# Vulnerability Scanner Benchmark

A beginner-friendly benchmarking system that tests how well an AI-powered code vulnerability scanner performs — measuring accuracy, detection rate, and false positive rate against a labelled dataset of real vulnerability patterns.

---

## What Does This Project Do?

When you build a security tool, you need to *prove* it works. This benchmark does exactly that:

1. It sends known-vulnerable (and known-safe) code snippets to your scanner API.
2. It records what the scanner predicted.
3. It compares predictions against the correct answers and prints a score.

Think of it like a test paper for your AI scanner.

---

## Why Is This Important in Modern DevSecOps?

In modern software teams, code is pushed dozens of times a day. Security can't be a manual afterthought — it has to be **automated and fast**.

This benchmark helps you answer three critical questions before you trust your scanner in a real CI/CD pipeline:

| Question | Metric |
|---|---|
| Does it catch real vulnerabilities? | Detection Rate |
| Does it produce too many false alarms? | False Positive Rate (target < 15%) |
| Is it right more often than wrong? | Accuracy |

If a scanner has a high false positive rate, developers start ignoring its warnings — which defeats the whole purpose.

---

## Project Structure

```
vuln-scanner-project/
└── benchmark/
    ├── dataset.json    ← 10 labelled test cases (vulnerabilities + safe code)
    ├── test_api.py     ← sends each test case to your scanner API
    ├── evaluate.py     ← calculates accuracy and false positive rate
    └── README.md       ← this file
```

---

## Test Cases Included

| ID | Vulnerability | OWASP | Severity |
|---|---|---|---|
| TC001 | SQL Injection (string concat) | A03 | High |
| TC002 | Hardcoded password | A07 | High |
| TC003 | eval() on user input | A03 | High |
| TC004 | OS command injection | A03 | High |
| TC005 | Hardcoded API key | A07 | Medium |
| TC006 | SQL Injection (format string) | A03 | High |
| TC007 | subprocess shell=True | A03 | High |
| TC008 | Safe parameterized query | None | None |
| TC009 | Safe bcrypt password hash | None | None |
| TC010 | Insecure pickle deserialization | A08 | High |

---

## How to Run

### Step 1 — Install dependencies

```bash
pip install requests
```

### Step 2 — Start your scanner API

Your scanner API must be running at:
```
http://localhost:8000/api/scan
```

It should accept POST requests with this body:
```json
{
  "language": "python",
  "diff": "<code change here>"
}
```

And return something like:
```json
{
  "findings": [
    {
      "vulnerability": "SQL Injection",
      "severity": "High",
      "owasp_category": "A03:2021-Injection"
    }
  ]
}
```

### Step 3 — Run the tests

From the project root folder:

```bash
python benchmark/test_api.py
```

This reads `dataset.json`, calls your API for each test case, and saves all responses to `results.json`.

### Step 4 — Evaluate the results

```bash
python benchmark/evaluate.py
```

This reads `dataset.json` + `results.json` and prints a full report:

```
============================================================
  Vulnerability Scanner — Evaluation Report
============================================================

  ID       Expected                       Flagged  Verdict
------------------------------------------------------------
  TC001    SQL Injection                  YES      CORRECT (True Positive)
  TC002    Hardcoded Credentials          YES      CORRECT (True Positive)
  TC008    None                           NO       TRUE NEGATIVE
  ...

============================================================
  SUMMARY METRICS
============================================================
  Accuracy              : 90.0%
  False Positive Rate   : 0.0%   (target: < 15%)
  Detection Rate        : 87.5%

  HACKATHON TARGETS:
  False Positive Rate ≤ 15% : PASS  (0.0%)
  Accuracy ≥ 70%            : PASS  (90.0%)

  Overall Result: PASS — scanner meets benchmark criteria!
============================================================
```

---

## Evaluation Logic (Plain English)

| Situation | Label | Meaning |
|---|---|---|
| Real vuln + scanner flagged it | True Positive | Scanner did its job |
| Real vuln + scanner missed it | False Negative | Scanner failed silently |
| Safe code + scanner flagged it | False Positive | Unnecessary alarm |
| Safe code + scanner stayed quiet | True Negative | Correctly ignored |

**Accuracy** = (True Positives + True Negatives) ÷ Total Cases × 100

**False Positive Rate** = False Positives ÷ All Safe Cases × 100

---

## Troubleshooting

**"Cannot connect to API"** — Make sure your scanner server is running on port 8000 before running `test_api.py`.

**"results.json not found"** — Run `test_api.py` before `evaluate.py`. The test runner creates `results.json`.

**All predictions empty** — Check that your API returns a JSON body with a `findings` key containing a list.

---

## Benchmark Targets (Hackathon Criteria)

| Metric | Target |
|---|---|
| Accuracy | ≥ 70% |
| False Positive Rate | < 15% |
| Scan time per diff | < 30 seconds |