import os
import sqlite3

def get_user(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # SAFE: parameterized query (no SQL injection)
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    result = cursor.fetchone()

    conn.close()
    return result


def run_command():
    # SAFE: controlled command
    os.system("echo Hello World")
