const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403);

    

    next();
  });
}

module.exports = auth;
