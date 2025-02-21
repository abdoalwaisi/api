const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const db = new sqlite3.Database("./bobje.db");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10); 
};

// GET params id
function getUserinfo(req, res) {
  const id = req.params.id;
  db.get(`SELECT * FROM users WHERE id = $id`, { $id: id }, (err, user) => {
    if (err) {
      return res.status(404).json({ msg: "err" });
    }
    res.status(200).json(user);
  });
}

async function newUser(req, res) {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ mess: "Name, username, and password are required" });
  }
   const hashedPassword = await hashPassword(password);
  db.run(
    `INSERT INTO users (name, username, password) VALUES ($name , $username , $password)`,
    {
      $name: name,
      $username: username,
      $password: hashedPassword,
    },
    (err) => {
      if (err) res.status(400).json({});
    }
  );
  res.status(200).json({});
}

function updateUserinfo(req, res) {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ mss: "missing info" });
  }
  db.run(
    `UPDATE users SET name = $name , password = $password WHERE username = $username`,
    {
      $name: name,
      $username: username,
      $password: password,
    },
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }
    }
  );
  res.status(200).json({});
}

module.exports = { getUserinfo, newUser, updateUserinfo };
