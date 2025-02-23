const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bobje.db");

function newProduct(req, res) {
  const { name, price, descreption } = req.body;
  if (!name || !price) {
    return res.status(400).json({ msg: "name and price is required" });
  }

  db.run(
    "INSERT INTO products (name, price, description) VALUES ($name, $price, $description)",
    {
      $name: name,
      $price: price,
      $description: descreption || "",
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

function getProduct(req, res) {
  const id = req.params.id;
  const product = db.get(`SELECT * FROM products WHERE id = ?`, [id], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
  });
  console.log(product, id);
  if (!product) {
    return res.status(404).json({ msq: "product not found" });
  }
  res.status(200).json(product);
}

function getProduct(req, res) {
  const id = req.params.id;

  // Use parameterized query to avoid SQL injection
  const sql = `SELECT * FROM products WHERE id = ?`;
  db.get(sql, [id], (err, product) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
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

function updateProduct(req, res) {
  const id = req.params.id;
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ msg: "name and price is required" });
  }

  db.run(
    `UPDATE products SET name = ? , price = ? , description = ? WHERE id = ? `,
    [name, price, description, id],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }
    }
  );
  res.status(200).json({ meg: "updated" });
}

function deleteProduct(req, res) {}

module.exports = {
  newProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
