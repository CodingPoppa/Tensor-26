import os
import time
import json
from openai import OpenAI
from models import ScanRequest, ScanResponse, Finding

# Grok (xAI) uses an OpenAI-compatible client
client = OpenAI(
    api_key=os.getenv("GROK_API_KEY"), # Ensure this is set in your environment
    base_url="https://api.x.ai/v1",
)

def scan_diff(request: ScanRequest) -> ScanResponse:
    start_time = time.time()
    
    # We remove the old hardcoded 'if "password" in diff' logic 
    # and replace it with a prompt to the Grok AI.
    prompt = f"""
    Analyze the following {request.language} code diff for security vulnerabilities.
    Return ONLY a JSON object with:
    1. "findings": A list of objects with (file, line, owasp_category, severity, explanation, fix_before, fix_after).
    2. "decision": "FAIL" if any HIGH severity issues are found, else "PASS".

    DIFF:
    {request.diff}
    """

    try:
        response = client.chat.completions.create(
            model="grok-beta", # or the specific grok model you have access to
            messages=[
                {"role": "system", "content": "You are a security expert that only outputs JSON."},
                {"role": "user", "content": prompt},
            ],
            temperature=0,
        )
        
        # Parse the AI response
        raw_content = response.choices[0].message.content
        ai_data = json.loads(raw_content)
        
        findings = [Finding(**f) for f in ai_data.get("findings", [])]
        decision = ai_data.get("decision", "PASS")
        
    except Exception as e:
        print(f"Grok API Error: {e}")
        findings = []
        decision = "ERROR"

    end_time = time.time()
    return ScanResponse(
        findings=findings,
        decision=decision,
        scan_time_ms=int((end_time - start_time) * 1000)
    )
