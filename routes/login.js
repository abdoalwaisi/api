const experss = require("express")
const {login} = require("../models/login") 


const router = experss.Router()

router.post("/", (req , res) => {
  login(req , res)
});

router.delete("/", () => {
  console.log("nigga2");
});

module.exports = router