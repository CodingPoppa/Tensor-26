# VULNERABLE CODE - DO NOT USE
import sqlite3

def get_user_bad(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    # Danger: String formatting allows SQL Injection
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchone()
