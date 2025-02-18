const express = require("express");
const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("../db/ecommerce.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});


let products = [
  { id: "1", name: "hehe", price: 1, descreption: "good product1" },
  { id: "2", name: "hehe2", price: 2, descreption: "good product2" },
  { id: "3", name: "hehe3", price: 3, descreption: "good product3" },
  { id: "4", name: "hehe4", price: 4, descreption: "good product4" },
  { id: "5", name: "hehe5", price: 5, descreption: "good product5" },
];

function getProducts(req, res) {
  res.status(200).json(products);
}

function getProduct(req, res) {
  const id = req.params.id;
  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ msq: "product not found" });
  }
  res.status(200).json(product);
}

function newProduct(req, res) {
  const { name, price, descreption } = req.body;
  if (!name || !price) {
    return res.status(400).json({ msg: "name and price is required" });
  }
  const product = {
    id: products.length + 1,
    name: name,
    price: price,
    descreption: descreption || "",
  };
  products.push(product);
  res.status(200).json(products);
}

function updateProduct(req, res) {
  const id = req.params.id;
  const { name, price, descreption } = req.body;

  const product = products.find((item) => item.id === id);

  if (!id && !product) {
    return res.status(400).json({ msg: "no product with this id" });
  }
  if (!name || !price) {
    return res.status(400).json({ msg: "name and price is required" });
  }

  product.name = name;
  product.price = price;
  product.descreption = descreption || "";

  res.status(200).json(products);
}

function deleteProduct(req, res) {
  const id = req.params.id;
  const check = products.find((item) => item.id === id);
  if (!check) {
    return res.status(400).json({ msg: "no product with this id" });
  }
  products = products.filter((item) => item.id !== id);
  res.status(200).json(products);
}

module.exports = {
  getProduct,
  getProducts,
  newProduct,
  updateProduct,
  deleteProduct,
};
