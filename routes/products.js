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

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await getProduct(id);
    if (!product) {
      return res.status(404).json({ msq: "product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.msg === "not found") {
      res.status(404).json(err);
    }
    if (err) {
      res.status(500).json(err);
    }
  }
});

router.post("/", auth, async (req, res, next) => {
  const { name, price, descreption } = req.body;
  if (!name || !price) {
    return res.status(400).json({ msg: "name and price is required" });
  }
  try {
    const resalt = await newProduct(name, price, descreption);
    res.status(200).json(resalt);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const id = req.params.id;
  const { name, price, description } = req.body;
  try {
    const result = await updateProduct(id, name, price, description);

    res.status(200).json(result);
  } catch (error) {
    if (error.error === "Product not found") {
      res.status(404).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await deleteProduct(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
