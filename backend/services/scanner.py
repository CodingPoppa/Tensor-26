import time
from models import ScanRequest, ScanResponse, Finding


def extract_added_lines(diff: str):
    """Extract only added lines from git diff"""
    return [line[1:] for line in diff.split("\n") if line.startswith("+")]


def scan_diff(request: ScanRequest) -> ScanResponse:
    start_time = time.time()

    raw_diff = request.diff
    lines = extract_added_lines(raw_diff)

    findings = []

    for i, line in enumerate(lines):
        diff = line.lower()

        # -------------------------------
        # 🟢 SAFE CASE (avoid false positives)
        # -------------------------------
        if "cursor.execute" in diff and "?" in diff:
            continue  # safe parameterized query

        # -------------------------------
        # 🔴 SQL Injection
        # -------------------------------
        if "select" in diff and "+" in diff:
            findings.append(Finding(
                file="diff_input",
                line=i + 1,
                owasp_category="A03:2021-Injection",
                severity="HIGH",
                explanation="SQL query constructed using string concatenation, allowing injection.",
                fix_before=line,
                fix_after="Use parameterized queries: cursor.execute('SELECT * FROM users WHERE id=%s', (user_id,))"
            ))

        if "select" in diff and "%" in diff:
            findings.append(Finding(
                file="diff_input",
                line=i + 1,
                owasp_category="A03:2021-Injection",
                severity="HIGH",
                explanation="SQL query uses string formatting which can lead to injection.",
                fix_before=line,
                fix_after="Use parameterized queries instead of string formatting."
            ))

        # -------------------------------
        # 🔴 Hardcoded Secrets
        # -------------------------------
        if any(k in diff for k in ["password", "api_key", "secret", "token"]):
            if "=" in diff and any(x in diff for x in ["'", '"']):
                findings.append(Finding(
                    file="diff_input",
                    line=i + 1,
                    owasp_category="A07:2021-Identification and Authentication Failures",
                    severity="HIGH",
                    explanation="Hardcoded sensitive credential detected in code.",
                    fix_before=line,
                    fix_after="Use environment variables: os.getenv('SECRET_NAME')"
                ))

        # -------------------------------
        # 🔴 eval() Injection
        # -------------------------------
        if "eval(" in diff:
            findings.append(Finding(
                file="diff_input",
                line=i + 1,
                owasp_category="A03:2021-Injection",
                severity="HIGH",
                explanation="Use of eval() on user input can lead to arbitrary code execution.",
                fix_before=line,
                fix_after="Avoid eval(); use safe parsing like ast.literal_eval"
            ))

        # -------------------------------
        # 🔴 OS Command Injection
        # -------------------------------
        if "os.system" in diff:
            findings.append(Finding(
                file="diff_input",
                line=i + 1,
                owasp_category="A03:2021-Injection",
                severity="HIGH",
                explanation="os.system() with user input can lead to command injection.",
                fix_before=line,
                fix_after="Use subprocess with argument list and no shell=True"
            ))

        # -------------------------------
        # 🔴 subprocess shell=True
        # -------------------------------
        if "subprocess" in diff and "shell=true" in diff:
            findings.append(Finding(
                file="diff_input",
                line=i + 1,
                owasp_category="A03:2021-Injection",
                severity="HIGH",
                explanation="subprocess with shell=True can lead to command injection.",
                fix_before=line,
                fix_after="Set shell=False and pass arguments as a list"
            ))

        # -------------------------------
        # 🔴 Insecure Deserialization
        # -------------------------------
        if "pickle.loads" in diff:
            findings.append(Finding(
                file="diff_input",
                line=i + 1,
                owasp_category="A08:2021-Software and Data Integrity Failures",
                severity="HIGH",
                explanation="pickle.loads() on untrusted input can lead to code execution.",
                fix_before=line,
                fix_after="Use safer formats like JSON instead of pickle"
            ))

    # -------------------------------
    # 🚦 Decision Logic
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