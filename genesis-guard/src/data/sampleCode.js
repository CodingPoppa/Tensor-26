export const sampleCode = {
  javascript: {
    secure: `const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Parameterized query prevents SQL Injection
  const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
  if (results.length > 0) {
    // Secure bcrypt comparison
    const match = await bcrypt.compare(password, results[0].password);
    if (match) return res.send({ token: 'success' });
  }
  
  res.status(401).send('Unauthorized');
});

module.exports = router;`,
    insecure: `const express = require('express');
const crypto = require('crypto');
const db = require('./database');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // MD5 hashing (Vulnerable to collision)
  const hash = crypto.createHash('md5').update(password).digest('hex');
  
  // Unsanitized SQL query (Injection Vulnerability)
  const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
  const results = await db.query(query);
  
  if (results.length > 0 && results[0].password === hash) {
    res.send({ token: 'success' });
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;`
  },
  python: {
    secure: `import yaml
import sqlite3

def load_config(user_input, db_path):
    # Using safe_load prevents arbitrary code execution
    config = yaml.safe_load(user_input)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # Parameterized query
    cursor.execute("SELECT * FROM configs WHERE name=?", (config['name'],))
    
    return cursor.fetchone()`,
    insecure: `import yaml
import sqlite3

def load_config(user_input, db_path):
    # Unsafe YAML loading (RCE Vulnerability)
    config = yaml.load(user_input, Loader=yaml.Loader)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Direct string formatting in query
    query = f"SELECT * FROM configs WHERE name='{config['name']}'"
    cursor.execute(query)
    
    return cursor.fetchone()`
  },
  java: {
    secure: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AuthDAO {
    public boolean authenticate(Connection conn, String username) throws Exception {
        String query = "SELECT * FROM users WHERE username = ?";
        try (PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, username);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        }
    }
}`,
    insecure: `import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

public class AuthDAO {
    public boolean authenticate(Connection conn, String username) throws Exception {
        Statement stmt = conn.createStatement();
        // Concatenated query string (SQL Injection Vulnerability)
        String query = "SELECT * FROM users WHERE username = '" + username + "'";
        ResultSet rs = stmt.executeQuery(query);
        return rs.next();
    }
}`
  }
};
