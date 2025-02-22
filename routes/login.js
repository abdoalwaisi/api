const experss = require("express")
const {login} = require("../models/login") 


const router = experss.Router()

router.post("/", (req , res , next) => {
  login(req , res)
});


module.exports = router