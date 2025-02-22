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

router.get("/", (req, res, next) => {
  getProducts(req, res);
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
