# This is "Wrong Data" - Hardcoded secret and SQL injection
API_KEY = "sk-1234567890abcdef" 

def get_user(user_id):
    # Unsafe string concatenation
    query = "SELECT * FROM users WHERE id = " + user_id
    return query
