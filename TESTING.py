import os
import sqlite3
import subprocess

# ❌ VULNERABILITY: Hardcoded Secret (A07:2021)
# Your scanner looks for 'password' + '=' + quotes
admin_password = "super-secret-password-123"

def delete_user(user_id):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    
    # ❌ VULNERABILITY: SQL Injection (A03:2021)
    # Your scanner looks for 'select' or 'delete' combined with '+' or '%'
    query = "DELETE FROM users WHERE id = " + user_id
    cursor.execute(query)
    
    conn.commit()

def ping_server(ip_address):
    # ❌ VULNERABILITY: Command Injection (A03:2021)
    # Your scanner looks for 'os.system' or 'shell=true'
    os.system("ping -c 1 " + ip_address)
    
    # This would also trigger your scanner:
    # subprocess.run(f"ls {ip_address}", shell=True)
