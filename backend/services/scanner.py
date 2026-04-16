import os
import time
import json
from groq import Groq
from models import ScanRequest, ScanResponse, Finding

# Initialize the Groq client using the Environment Variable
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def scan_diff(request: ScanRequest) -> ScanResponse:
    start_time = time.time()
    
    # This prompt tells the AI exactly how to behave and what format to return
    prompt = f"""
    You are a DevSecOps Security Expert. Analyze the following code diff for security vulnerabilities in {request.language}.
    
    RULES:
    1. Identify SQL injection, hardcoded secrets, OS injection, and XSS.
    2. You MUST return ONLY a valid JSON object.
    3. The JSON must have:
       - "findings": a list of objects containing (file, line, owasp_category, severity, explanation, fix_before, fix_after)
       - "decision": "FAIL" if any HIGH severity issues are found, otherwise "PASS".

    DIFF TO ANALYZE:
    {request.diff}
    """

    try:
        # Call Groq AI
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional security auditor that outputs only JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="llama3-8b-8192",
            response_format={"type": "json_object"} # Ensures we get clean JSON
        )
        
        # Parse the AI response
        ai_response_content = chat_completion.choices[0].message.content
        ai_data = json.loads(ai_response_content)
        
        # Convert JSON findings into our Python Finding objects
        findings = [Finding(**f) for f in ai_data.get("findings", [])]
        decision = ai_data.get("decision", "PASS")
        
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        # Fallback if AI fails
        findings = []
        decision = "ERROR"

    end_time = time.time()
    
    return ScanResponse(
        findings=findings,
        decision=decision,
        scan_time_ms=int((end_time - start_time) * 1000)
    )
