from fastapi import FastAPI, HTTPException
import sqlite3
import os
import subprocess

app = FastAPI()

# 🔒 Secure DB query (parameterized)
@app.get("/user")
def get_user(user_id: int):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    query = "SELECT * FROM users WHERE id = ?"
    cursor.execute(query, (user_id,))

    result = cursor.fetchall()
    return {"data": result}


# 🔒 Secure login (no hardcoded creds)
@app.get("/login")
def login(username: str, password: str):

    # pretend we fetch hashed password from DB
    stored_password = os.getenv("ADMIN_PASSWORD")

    if password == stored_password:
        return {"status": "logged in"}

    return {"status": "failed"}


# 🔒 No sensitive data exposure
@app.get("/debug")
def debug():
    return {"message": "Debug disabled in production"}


# 🔒 Safe command execution (restricted)
@app.get("/run")
def run(action: str):

    allowed_commands = {
        "list": ["ls"],
        "date": ["date"]
    }

    if action not in allowed_commands:
        raise HTTPException(status_code=400, detail="Invalid action")

    result = subprocess.run(
        allowed_commands[action],
        capture_output=True,
        text=True
    )

    return {"output": result.stdout}
