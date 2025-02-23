const express = require("express");
const { getUserinfo, newUser, updateUserinfo } = require("../models/user");
const auth = require("../middleware/authenticate");

const router = express.Router();

router.get("/:id", auth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await getUserinfo(id);
    res.status(200).json(user);
  } catch (err) {
    if (err.msg === "not found") {
      res.status(404).json(err);
    } else {
      res.status(500).json(err);
    }
  }
});

router.post("/", auth, async (req, res, next) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ mess: "Name, username, and password are required" });
  }
  try {
    const result = await newUser(name, username, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", auth, async (req, res, next) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ mss: "missing info" });
  }

  try {
    const result = await updateUserinfo(req, res);
    res.status.json(result);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
