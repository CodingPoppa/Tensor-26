🚀 API_CONTRACT.md — TENSOR’26 (Team GENESIS)

This document defines the official API contract for the Real-Time Code Vulnerability Scanner.

⚠️ IMPORTANT RULE:
Once agreed, DO NOT change this structure. All team members must follow this exactly.

🧠 Base URL

During development:

http://localhost:8000
🔍 1. Health Check API
Endpoint
GET /api/health
Purpose
Check if backend is running
Used by frontend and CI/CD for validation
Response
{
  "status": "ok"
}
🔥 2. Scan API (MAIN CORE)
Endpoint
POST /api/scan
Purpose
Analyze code diff for vulnerabilities
Return OWASP-classified findings
Decide CI pass/fail
📥 Request Body
{
  "diff": "string (git diff or code snippet)",
  "language": "python | javascript | java"
}
📤 Response Body
{
  "findings": [
    {
      "file": "string",
      "line": 0,
      "owasp_category": "string",
      "severity": "LOW | MEDIUM | HIGH",
      "explanation": "string",
      "fix_before": "string",
      "fix_after": "string"
    }
  ],
  "decision": "PASS | FAIL",
  "scan_time_ms": 0
}
🧠 Decision Logic (Backend Rule)
if any(f["severity"] == "HIGH" for f in findings):
    decision = "FAIL"
else:
    decision = "PASS"
🧪 3. Mock Scan API (FOR FRONTEND DEVELOPMENT)
Endpoint
GET /api/mock-scan
Purpose
Allows frontend to build UI before backend is ready
📤 Response
{
  "findings": [
    {
      "file": "app.py",
      "line": 5,
      "owasp_category": "A02:2021 – Cryptographic Failures",
      "severity": "MEDIUM",
      "explanation": "Hardcoded password detected.",
      "fix_before": "password = '123456'",
      "fix_after": "password = os.getenv('PASSWORD')"
    }
  ],
  "decision": "FAIL",
  "scan_time_ms": 300
}
🔗 DATA FLOW

Frontend → /api/scan → Backend → AI → Backend → Frontend

CI/CD → /api/scan → Decision (PASS/FAIL)

👥 TEAM RESPONSIBILITIES
🧠 Backend (T1)
Implement /api/scan
Integrate AI
Return structured response
🎨 Frontend (T3)
Call /api/scan
Use /api/mock-scan initially
Display findings
⚙️ CI/CD (T2)
Send git diff to /api/scan
Use decision for pipeline result
🧪 Benchmark (T4)
Test /api/scan
Measure accuracy, speed, false positives
⚠️ FINAL RULES
Do NOT rename fields
Do NOT change JSON structure
Do NOT change endpoint names
🏆 GOAL

A single working system where:

Code diff → analyzed by AI
Vulnerabilities detected
Fix suggestions generated
CI decision produced
