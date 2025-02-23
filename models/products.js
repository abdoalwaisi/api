const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bobje.db");

// POST req.body name price descreption
function newProduct(name, price, descreption) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO products (name, price, description) VALUES ($name, $price, $description)",
      {
        $name: name,
        $price: price,
        $description: descreption || "",
      },
      (err) => {
        if (err) {
          reject({ err: err });
        }
        resolve({ msg: "new product created" });
      }
    );
  });
}

// GET params id
function getProduct(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, product) => {
      if (err) {
        reject({ error: "Database error", details: err.message });
      } else if (!product) {
        reject({ msg: "not found" });
      }
      resolve(product);
    });
  });
}

// GET
function getProducts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, [], (err, products) => {
      if (err) {
        reject({ msg: "database err" });
      } else if (!products || products.length === 0) {
        reject([]);
      }
      if (products) {
        resolve(products);
      }
    });
  });
}

// PUT params id req.body name price description
function updateProduct(id, name, price, description) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE products SET name = ? , price = ? , description = ? WHERE id = ? `,
      [name, price, description, id],
      (err) => {
        if (err) {
          reject({ error: "Database error", details: err.message });
        } else if (this.changes === 0) {
          // Handle case where no rows were updated (e.g., invalid ID)
          reject({
            error: "Product not found",
            details: `No product with id ${id} found`,
          });
        }
        resolve({ meg: "updated" });
      }
    );
  });
}

//DELETE  params id
function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
      if (err) {
        // Handle database errors
        reject({ error: "Database error", details: err.message });
      } else if (this.changes === 0) {
        // Handle case where no rows were deleted (e.g., invalid ID)
        reject({
          error: "Product not found",
          details: `No product with id ${id} found`,
        });
      } else {
        // Resolve with a success message
        resolve({ msg: "Product deleted successfully" });
      }
    });
  });
}

module.exports = {
  newProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
