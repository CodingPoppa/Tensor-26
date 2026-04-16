import os
import sqlite3

# ✅ SAFE: Using environment variables instead of hardcoded strings
db_password = os.getenv("DB_PASSWORD")
api_token = os.getenv("API_KEY")

def get_user_data(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    
    # ✅ SAFE: Using parameterized queries (?) 
    # Your scanner has a specific check to 'continue' (skip) if it sees '?'
    query = "SELECT * FROM users WHERE id = ?"
    cursor.execute(query, (user_id,))
    
    return cursor.fetchone()
