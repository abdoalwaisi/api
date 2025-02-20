const experss = require("express")


const router = experss.Router()

router.post("/", () => {
  console.log("nigga");
});

router.delete("/", () => {
  console.log("nigga2");
});

module.exports = router