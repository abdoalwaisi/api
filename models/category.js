const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bobje.db");

// POST req.body name

function newCategory(name) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO category (name) VALUES (?)`, [name], async (err) => {
      if (!err) {
        resolve({ msg: "new category created" });
      } else {
        reject(err);
      }
    });
  });
}
// GET params name

function getCategory(name) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM category WHERE name = ?`, [name], (err, category) => {
      if (err) {
        reject(err);
      } else if (!category) {
        reject({ err: "not found" });
      } else {
        resolve(category);
      }
    });
  });
}
// GET
function getAllCategorys() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM category`, [], (err, category) => {
      if (err) {
        reject(err);
      } else if (!category) {
        reject({ err: "not found" });
      } else {
        resolve(category);
      }
    });
  });
}
// DELETE req.params name
function deleteCategory(name) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM category WHERE name = ?`, [name], function (err) {
      if (err) {
        reject(err); // Database error
      } else if (this.changes === 0) {
        reject({ err: "not found" }); // No rows deleted (category not found)
      } else {
        resolve({ msg: "category deleted", changes: this.changes }); // Success
      }
    });
  });
}

module.exports = { newCategory, getCategory, getAllCategorys, deleteCategory };
