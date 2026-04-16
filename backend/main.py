from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ScanRequest, ScanResponse
from services.scanner import scan_diff

app = FastAPI(title="AI Vulnerability Scanner")

# ✅ CORS (needed for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Health check
@app.get("/api/health")
def health():
    return {"status": "ok"}

# ✅ Mock scan (for frontend testing)
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

# 🔥 Main scan API
@app.post("/api/scan", response_model=ScanResponse)
def scan(request: ScanRequest):
    return scan_diff(request)