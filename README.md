# 🔄 System Workflow

## 📌 Overview

Our system integrates a vulnerability scanner into a modern DevSecOps pipeline. It automatically analyzes code changes, detects security issues, and ensures only safe code is deployed.

---

## ⚙️ Step-by-Step Workflow

### 1️⃣ Developer Pushes Code

A developer writes code and pushes changes (commit or pull request) to the repository.

---

### 2️⃣ CI/CD Pipeline Triggers

The CI/CD system automatically detects the change and triggers the pipeline.

---

### 3️⃣ Code Diff Sent to Backend

The changed code (diff) is sent to the backend API for analysis.

---

### 4️⃣ Vulnerability Scanning

The backend scans the code and:

* Detects vulnerabilities
* Classifies them (OWASP)
* Assigns severity
* Suggests fixes

---

### 5️⃣ Decision Making

Based on severity:

* ✅ Safe code → PASS
* ❌ High-risk code → FAIL

---

### 6️⃣ Results Displayed (Frontend)

The frontend shows:

* Detected vulnerabilities
* Explanations
* Suggested fixes

---

### 7️⃣ Benchmark Evaluation (T4)

Our benchmark system tests the scanner using predefined cases and calculates:

* Accuracy
* False Positive Rate

This ensures the scanner is reliable.

---

## 🎯 Final Outcome

* 🚫 Vulnerable code is blocked
* 🔐 Secure code is deployed
* ⚡ Security becomes automatic

---

## 🧠 Summary (Quick Explanation)

> Code → CI/CD → Scanner API → Results → Decision → Display + Evaluation
