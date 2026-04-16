import os
from fastapi import FastAPI, Header, HTTPException
from models import ScanRequest, ScanResponse
from services.scanner import scan_diff

app = FastAPI(title="AI Vulnerability Scanner")

@app.post("/api/scan", response_model=ScanResponse)
def scan(request: ScanRequest, x_api_key: str = Header(None)):
    # This must match the GROK_API_KEY used in the scanner
    if x_api_key != os.getenv("GROK_API_KEY"):
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    return scan_diff(request)

@app.get("/api/health")
def health():
    return {"status": "ok"}
