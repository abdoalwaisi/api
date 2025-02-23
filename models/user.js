const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const db = new sqlite3.Database("./bobje.db");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// GET params id
function getUserinfo(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = $id`, { $id: id }, (err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        reject({ msg: "not found" });
      } else {
        resolve({ name: user.name, username: user.username, id: user.id });
      }
    });
  });
}
// POST req.body name, username, password
async function newUser(name, username, password) {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await hashPassword(password);
    db.run(
      `INSERT INTO users (name, username, password) VALUES ($name , $username , $password)`,
      {
        $name: name,
        $username: username,
        $password: hashedPassword,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "new user created" });
        }
      }
    );
  });
}

function updateUserinfo(name, username, password) {}

module.exports = { getUserinfo, newUser, updateUserinfo };
