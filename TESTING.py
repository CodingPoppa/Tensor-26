from fastapi import FastAPI, Request
import sqlite3

app = FastAPI()

@app.get("/user")
def get_user(request: Request):
    user_id = request.query_params.get("id")

    # ❌ SQL Injection
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)

    result = cursor.fetchall()

    return {"data": result}


@app.get("/login")
def login(username: str, password: str):

    # ❌ Hardcoded credentials
    if username == "admin" and password == "123456":
        return {"status": "logged in"}

    return {"status": "failed"}


@app.get("/debug")
def debug():
    # ❌ Sensitive data exposure
    return {
        "secret_key": "mysecret123",
        "db_password": "rootpassword"
    }


@app.get("/run")
def run(cmd: str):
    import os

    # ❌ Command Injection
    output = os.system(cmd)

    return {"output": output}
