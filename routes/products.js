const express = require('express')
const {
  getProduct,
  getProducts,
  newProduct,
  updateProduct,
  deleteProduct,
} = require("../models/products");

const router = express.Router()


router.get("/", (req ,res , next) => {
  getProducts(req, res);
});

router.get("/:id", (req, res, next) => {
  getProduct(req, res);
});

router.post("/", (req, res, next) => {
  newProduct(req, res);
  
});

router.put("/:id", (req, res, next) => {
  updateProduct(req ,res)
  
});

router.delete("/:id", (req, res, next) => {
  deleteProduct(req , res)
});

module.exports = router