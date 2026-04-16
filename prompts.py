MAIN_PROMPT = """
You are a senior application security engineer.

Analyze the given JavaScript code and detect REAL security vulnerabilities using OWASP Top 10.

Return ONLY valid JSON in this format:

{
  "findings": [
    {
      "file": "app.js",
      "line": 1,
      "owasp_category": "string",
      "severity": "LOW | MEDIUM | HIGH",
      "explanation": "string",
      "fix_before": "string",
      "fix_after": "string"
    }
  ]
}

Code:
"""
