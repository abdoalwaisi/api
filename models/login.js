const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = new sqlite3.Database("./bobje.db");
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("SECRET_KEY is not defined in the environment variables.");
  process.exit(1);
}

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  db.get(
    `SELECT * FROM users WHERE username =?`,
    [username],
    async (err, user) => {
      if (err) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: { id: user.id, username: user.username },
      });
    }
  );
}

module.exports = { login };
