import os
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ScanRequest, ScanResponse
from services.scanner import scan_diff

# Initialize the FastAPI app [cite: 11, 12]
app = FastAPI(title="AI Vulnerability Scanner")

# ✅ CORS (needed for frontend) 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Health check [cite: 13]
@app.get("/api/health")
def health():
    return {"status": "ok"}

# ✅ Mock scan (for frontend testing) [cite: 14]
@app.get("/api/mock-scan")
def mock_scan():
    return {
        "findings": [
            {
                "file": "app.py",
                "line": 5,
                "owasp_category": "A02:2021 – Cryptographic Failures",
                "severity": "MEDIUM",
                "explanation": "Hardcoded password detected.",
                "fix_before": "password = '123456'",
                "fix_after": "password = \"os.getenv('PASSWORD')\""
            }
        ],
        "decision": "FAIL",
        "scan_time_ms": 300
    }

# 🔥 Main scan API with API Key Security [cite: 15, 16]
@app.post("/api/scan", response_model=ScanResponse)
def scan(request: ScanRequest, x_api_key: str = Header(None)):
    # Check if the provided API key matches the environment variable
    if x_api_key != os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    return scan_diff(request)
