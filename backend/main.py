from fastapi import FastAPI
from models import ScanRequest, ScanResponse
from services.scanner import scan_diff

app = FastAPI(title="AI Vulnerability Scanner")

@app.get("/api/health")
def health():
    return {"status": "ok"}


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
                "fix_after": "password = os.getenv('PASSWORD')"
            }
        ],
        "decision": "FAIL",
        "scan_time_ms": 300
    }


@app.post("/api/scan", response_model=ScanResponse)
def scan(request: ScanRequest):
    return scan_diff(request)