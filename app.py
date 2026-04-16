import os
import sqlite3

# Safe: Using environment variables
API_KEY = os.getenv("MY_API_KEY")

def get_user(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    # Safe: Using parameterized queries
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    return cursor.fetchone()
