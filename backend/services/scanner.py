import time

from models import ScanRequest, ScanResponse, Finding



def extract_added_lines(diff: str):

    """

    Extracts only added lines, removing the '+' prefix and stripping 

    leading/trailing whitespace to handle indented code.

    """

    lines = []

    for line in diff.split("\n"):

        # Skip git headers (e.g., +++ b/main.py) and take only added lines (+)

        if line.startswith("+") and not line.startswith("+++"):

            # Remove the '+' and whitespace

            clean_line = line[1:].strip()

            if clean_line:  # Avoid empty lines

                lines.append(clean_line)

    return lines



def scan_diff(request: ScanRequest) -> ScanResponse:

    start_time = time.time()

    raw_diff = request.diff

    lines = extract_added_lines(raw_diff)

    findings = []



    for i, line in enumerate(lines):

        # Use a lowercase version for matching logic

        low_line = line.lower()



        # -------------------------------

        # 🔴 SQL Injection

        # -------------------------------

        # Detects both string concatenation (+) and f-strings/formatting (%)

        if ("select" in low_line or "delete" in low_line) and any(op in low_line for op in ["+", "%", "f\"", "f'"]):

            # Ignore if it looks like a safe parameterized query

            if "?" not in low_line and "%s" not in low_line:

                findings.append(Finding(

                    file="diff_input",

                    line=i + 1,

                    owasp_category="A03:2021-Injection",

                    severity="HIGH",

                    explanation="SQL query constructed using unsafe string concatenation or formatting.",

                    fix_before=line,

                    fix_after="Use parameterized queries: cursor.execute('SELECT * FROM users WHERE id=%s', (user_id,))"

                ))



        # -------------------------------

        # 🔴 Hardcoded Secrets

        # -------------------------------

        # Catching keywords like 'password' or 'token' followed by an assignment

        if any(k in low_line for k in ["password", "api_key", "secret", "token"]):

            if "=" in low_line and ("'" in low_line or '"' in low_line):

                findings.append(Finding(

                    file="diff_input",

                    line=i + 1,

                    owasp_category="A07:2021-Identification and Authentication Failures",

                    severity="HIGH",

                    explanation="Hardcoded sensitive credential detected.",

                    fix_before=line,

                    fix_after="Use environment variables: os.getenv('SECRET_NAME')"

                ))



        # -------------------------------

        # 🔴 OS/Command Injection

        # -------------------------------

        if "os.system(" in low_line or ("subprocess" in low_line and "shell=true" in low_line.replace(" ", "")):

            findings.append(Finding(

                file="diff_input",

                line=i + 1,

                owasp_category="A03:2021-Injection",

                severity="HIGH",

                explanation="Execution of OS commands with potentially unsanitized input.",

                fix_before=line,

                fix_after="Use subprocess.run() with a list of arguments and shell=False"

            ))



        # -------------------------------

        # 🔴 Eval & Deserialization

        # -------------------------------

        if "eval(" in low_line or "pickle.loads(" in low_line:

            findings.append(Finding(

                file="diff_input",

                line=i + 1,

                owasp_category="A08:2021-Software and Data Integrity Failures",

                severity="HIGH",

                explanation="Unsafe execution or deserialization detected.",

                fix_before=line,

                fix_after="Use safe alternatives like ast.literal_eval() or JSON parsing."

            ))



    # Decision logic

    decision = "FAIL" if any(f.severity == "HIGH" for f in findings) else "PASS"

    end_time = time.time()



    return ScanResponse(

        findings=findings,

        decision=decision,

        scan_time_ms=int((end_time - start_time) * 1000)

    )
