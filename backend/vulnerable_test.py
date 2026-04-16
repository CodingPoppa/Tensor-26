import os
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ScanRequest, ScanResponse
from services.scanner import scan_diff

app = FastAPI(title="AI Vulnerability Scanner")

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

# 🔥 Main scan API with API Key Security
@app.post("/api/scan", response_model=ScanResponse)
def scan(request: ScanRequest, x_api_key: str = Header(None)):
    # Verify the key sent from GitHub matches your environment variable
    if x_api_key != os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    return scan_diff(request)
