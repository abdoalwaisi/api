const express = require("express");
const { getUserinfo, newUser, updateUserinfo } = require("../models/user");

const router = express.Router();

router.get("/:id", (req, res) => {
  getUserinfo(req, res);
});

router.post("/", (req, res) => {
  newUser(req, res);
});

router.put("/", (req, res) => {
  updateUserinfo(req, res);
});

module.exports = router;
