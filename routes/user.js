const express = require("express");
const { getUserinfo, newUser, updateUserinfo } = require("../models/user");
const auth = require("../middleware/authenticate");

const router = express.Router();

router.get("/:id", auth, (req, res, next) => {
  getUserinfo(req, res);
});

router.post("/", auth, (req, res, next) => {
  newUser(req, res);
});

router.put("/", auth, (req, res, next) => {
  updateUserinfo(req, res);
});

module.exports = router;
