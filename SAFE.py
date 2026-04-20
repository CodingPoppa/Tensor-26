from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ScanRequest, ScanResponse
from services.scanner import scan_diff
import os

app = FastAPI(title="AI Vulnerability Scanner")

# 🔒 Secure CORS (NO wildcard in production)
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# ✅ Health check
@app.get("/api/health")
def health():
    return {"status": "ok"}

# 🔒 Mock scan (safe example)
@app.get("/api/mock-scan")
def mock_scan():
    return {
        "findings": [],
        "decision": "PASS",
        "scan_time_ms": 100
    }

# 🔥 MAIN SCAN (secure wrapper)
@app.post("/api/scan", response_model=ScanResponse)
def scan(request: ScanRequest):

    # 🔒 Input validation
    if not request.diff or len(request.diff.strip()) == 0:
        raise HTTPException(status_code=400, detail="Empty diff")

    if len(request.diff) > 20000:
        raise HTTPException(status_code=413, detail="Diff too large")

    try:
        result = scan_diff(request)

        # 🔒 Ensure safe structure
        if "findings" not in result or "decision" not in result:
            raise ValueError("Invalid scanner output")

        return result

    except Exception as e:
        # 🔒 Prevent internal error leakage
        raise HTTPException(status_code=500, detail="Scan failed safely")
