const express = require("express");
const { getUserinfo, newUser, updateUserinfo } = require("../models/user");

const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  let userinfo = getUserinfo(id);
  if (userinfo) {
    res.json(userinfo);
  } else {
    res.status(404).json({ mess: "user not found" });
  }
});

router.post("/", (req, res) => {
  const { name, username, password } = req.body;

  // Input validation
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ mess: "Name, username, and password are required" });
  }

  const status = newUser(name, username, password);

  if (status) {
    res.status(200).json({ mess: "new user created" });
  } else {
    res.status(400).json({ mess: "user name is not abailabe" });
  }
});

router.put("/", (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ mss: "missing info" });
  }
  const status = updateUserinfo(name, username, password);
  if (status) {
    res.status(200).json({ mess: "user info update" });
  } else {
    res.status(400).json({ mess: "err" });
  }
});

module.exports = router;
