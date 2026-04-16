import time
from models import ScanRequest, ScanResponse, Finding


def scan_diff(request: ScanRequest) -> ScanResponse:
    start_time = time.time()

    diff = request.diff.lower()
    findings = []

    # -------------------------------
    # BASIC RULES (placeholder)
    # -------------------------------

    # Hardcoded password
    if "password" in diff and "123" in diff:
        findings.append(Finding(
            file="unknown",
            line=1,
            owasp_category="A02:2021 – Cryptographic Failures",
            severity="MEDIUM",
            explanation="Hardcoded password detected.",
            fix_before="password = '123456'",
            fix_after="password = os.getenv('PASSWORD')"
        ))

    # SQL Injection
    if "select" in diff and "+" in diff:
        findings.append(Finding(
            file="unknown",
            line=1,
            owasp_category="A03:2021 – Injection",
            severity="HIGH",
            explanation="Possible SQL injection due to string concatenation.",
            fix_before="query = 'SELECT * FROM users WHERE id=' + user_id",
            fix_after="query = 'SELECT * FROM users WHERE id=%s'"
        ))

    # -------------------------------
    # Decision Logic
    # -------------------------------
    if any(f.severity == "HIGH" for f in findings):
        decision = "FAIL"
    else:
        decision = "PASS"

    end_time = time.time()

    return ScanResponse(
        findings=findings,
        decision=decision,
        scan_time_ms=int((end_time - start_time) * 1000)
    )
