import os
import sqlite3

# WRONG: Hardcoded Secret
API_KEY = "sk-12345-secret-key-donot-share"

def get_user(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    # WRONG: SQL Injection (string concatenation)
    cursor.execute("SELECT * FROM users WHERE id = " + user_id)
    return cursor.fetchone()

def ping_host(ip):
    # WRONG: Command Injection
    os.system("ping -c 1 " + ip)
