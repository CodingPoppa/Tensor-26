from pydantic import BaseModel
from typing import List


class ScanRequest(BaseModel):
    diff: str
    language: str


class Finding(BaseModel):
    file: str
    line: int
    owasp_category: str
    severity: str
    explanation: str
    fix_before: str
    fix_after: str


class ScanResponse(BaseModel):
    findings: List[Finding]
    decision: str
    scan_time_ms: int