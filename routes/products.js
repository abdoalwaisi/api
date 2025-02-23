const express = require("express");
const auth = require("../middleware/authenticate");
const {
  deleteProduct,
  updateProduct,
  newProduct,
  getProduct,
  getProducts,
} = require("../models/products");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    if (products.length === 0) {
      res.status(404).json({ msg: "not found" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res, next) => {
  getProduct(req, res);
});

router.post("/", auth, (req, res, next) => {
  newProduct(req, res);
});

router.put("/:id", auth, (req, res, next) => {
  updateProduct(req, res);
});

router.delete("/:id", auth, (req, res, next) => {
  deleteProduct(req, res);
});

module.exports = router;
