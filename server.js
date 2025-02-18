const express = require("express");
const user = require("./routes/user");
const products = require("./routes/products");
const login = require("./routes/login");



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", user);
app.use("/api/products", products);
app.use("/api/login", login);

app.listen(8080, () => {
  console.log("server is runing");
});
