import os
import sqlite3
import subprocess
import pickle

def get_user(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # ❌ SQL Injection
    query = "SELECT * FROM users WHERE id = " + user_id
    cursor.execute(query)

    return cursor.fetchone()


# ❌ Hardcoded password
password = "123456"


# ❌ Command injection risk
def run_command(user_input):
    os.system("ls " + user_input)


# ❌ Dangerous subprocess
def run_shell(cmd):
    subprocess.run(cmd, shell=True)


# ❌ Unsafe deserialization
def load_data(data):
    return pickle.loads(data)


# ❌ Dangerous eval
def execute(code):
    eval(code)
