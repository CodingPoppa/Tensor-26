import os
import time
import json
import re
from groq import Groq
from models import ScanRequest, ScanResponse, Finding

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def scan_diff(request: ScanRequest) -> ScanResponse:
    start_time = time.time()
    
    # SYSTEM PROMPT: Forces the AI to be a strict JSON-only security bot
    system_message = (
        "You are a Senior DevSecOps Engineer. Analyze code diffs for OWASP vulnerabilities. "
        "You must output ONLY valid JSON. Do not include markdown code blocks (like ```json). "
        "Always provide a 'decision' of either 'PASS' or 'FAIL'."
    )

    # USER PROMPT: Provides context and the actual diff
    user_prompt = f"""
    Analyze this {request.language} git diff. 
    Look for: SQL Injection, Hardcoded Credentials, XSS, and Unsafe Deserialization.

    JSON Structure to follow:
    {{
        "findings": [
            {{
                "file": "filename",
                "line": 10,
                "owasp_category": "A03:2021-Injection",
                "severity": "HIGH",
                "explanation": "Brief description",
                "fix_before": "unsafe code",
                "fix_after": "safe code"
            }}
        ],
        "decision": "FAIL"
    }}

    DIFF:
    {request.diff}
    """

    try:
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_prompt}
            ],
            model="llama3-8b-8192",
            temperature=0.1, # Lower temperature = higher accuracy
            response_format={"type": "json_object"} 
        )
        
        raw_content = completion.choices[0].message.content
        ai_data = json.loads(raw_content)
        
        # Map JSON to Finding objects
        findings = []
        for f in ai_data.get("findings", []):
            findings.append(Finding(**f))
            
        decision = ai_data.get("decision", "PASS")
        
    except Exception as e:
        print(f"API Error: {e}")
        findings = []
        decision = "ERROR"

    return ScanResponse(
        findings=findings,
        decision=decision,
        scan_time_ms=int((time.time() - start_time) * 1000)
    )
