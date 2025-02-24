const express = require("express");
const {
  newCategory,
  getCategory,
  getAllCategorys,
  deleteCategory,
} = require("../models/category");

const router = express.Router();

router.get(`/:name`, async (req, res) => {
  const name = req.params.name;
  if (!name) {
    return res.status(404).json({ msg: "name is require" });
  }
  try {
    const category = await getCategory(name);
    res.status(200).json(category);
  } catch (error) {
    if (error) {
      res.status(404).json(error);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const categorys = await getAllCategorys();
    res.status(200).json(categorys);
  } catch (error) {
    if (err) {
      res.status(404).json(err);
    }
  }
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ msg: "name is require" });
  }
  try {
    const result = await newCategory(name);
    if (result.msg === "new category created") {
      res.status(200).json(result);
    }
  } catch (err) {
    if (err) {
      res.status(500).json({ err });
    }
  }
});

router.delete("/:name", async (req, res) => {
  const name = req.params.name;

  // Validate the name parameter
  if (!name) {
    return res.status(400).json({ msg: "name is required" });
  }

  try {
    const result = await deleteCategory(name);
    res.status(200).json(result); // Successfully deleted
  } catch (error) {
    if (error.err === "not found") {
      res.status(404).json({ msg: "no category found" }); // Category not found
    } else {
      res.status(500).json({ msg: "internal server error", error: error }); // Other errors
    }
  }
});

module.exports = router;
