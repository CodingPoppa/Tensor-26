export const mockFindings = {
  javascript: [
    {
      id: 1,
      file: "src/api/auth.js",
      line: 42,
      category: "A1: Injection",
      severity: "CRITICAL",
      confidence: 98,
      title: "SQL Injection Vulnerability",
      description: "Unsanitized user input is directly concatenated into a SQL query, allowing an attacker to manipulate the authentication logic and bypass login checks.",
      exploitPotential: "High - Allows full database dump or authentication bypass via payloads like `' OR '1'='1`.",
      snippet: "const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;",
      fixedSnippet: "const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);",
      fix: "Use parameterized queries or prepared statements to ensure input is escaped."
    },
    {
      id: 2,
      file: "cryptoUtils.js",
      line: 18,
      category: "A2: Cryptographic Failures",
      severity: "HIGH",
      confidence: 100,
      title: "Weak Hash Algorithm (MD5)",
      description: "The application uses MD5 for hashing passwords. MD5 is explicitly susceptible to collision attacks and rainbow table lookups.",
      exploitPotential: "Medium - If database is breached, attacker can rapidly crack passwords offline.",
      snippet: "const hash = crypto.createHash('md5').update(password).digest('hex');",
      fixedSnippet: "const match = await bcrypt.compare(password, userHash);",
      fix: "Upgrade to a computationally intensive algorithm like bcrypt, scrypt, or Argon2."
    }
  ],
  python: [
    {
      id: 3,
      file: "config_parser.py",
      line: 15,
      category: "A8: Software and Data Integrity Failures",
      severity: "CRITICAL",
      confidence: 95,
      title: "Insecure YAML Deserialization (RCE)",
      description: "Loading YAML with the default Loader allows instantiation of arbitrary Python objects, leading to Remote Code Execution.",
      exploitPotential: "High - Attacker can achieve reverse shell by submitting a payload containing python/object/apply.",
      snippet: "config = yaml.load(user_input, Loader=yaml.Loader)",
      fixedSnippet: "config = yaml.safe_load(user_input)",
      fix: "Use yaml.safe_load() which disables the instantiation of custom Python classes."
    }
  ],
  java: [
    {
      id: 4,
      file: "AuthDAO.java",
      line: 22,
      category: "A1: Injection",
      severity: "CRITICAL",
      confidence: 99,
      title: "String Concatenation SQLi",
      description: "Dynamically building SQL queries with string concatenation prevents the JDBC driver from escaping dangerous characters.",
      exploitPotential: "High - Attackers can execute arbitrary SQL statements.",
      snippet: "String query = \"SELECT * FROM users WHERE username = '\" + username + \"'\";\nResultSet rs = stmt.executeQuery(query);",
      fixedSnippet: "String query = \"SELECT * FROM users WHERE username = ?\";\ntry (PreparedStatement stmt = conn.prepareStatement(query)) {\n    stmt.setString(1, username);\n}",
      fix: "Convert the java.sql.Statement to an java.sql.PreparedStatement."
    }
  ]
};
