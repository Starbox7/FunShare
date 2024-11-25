const jwt = require("jsonwebtoken");
const db = require("../models/db");
require("dotenv").config();

// Access Token 검증 미들웨어
const authenticateAccessToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Token required" });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Access Token" });
    req.user = user;
    next();
  });
};

// Refresh Token 검증 미들웨어
const authenticateRefreshToken = (req, res, next) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ message: "Refresh Token required" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    const query = "SELECT * FROM users WHERE id = ? AND refresh_token = ?";
    db.query(query, [user.id, token], (dbErr, results) => {
      if (dbErr || results.length === 0)
        return res.status(403).json({ message: "Refresh Token not valid" });

      req.user = user;
      next();
    });
  });
};

module.exports = { authenticateAccessToken, authenticateRefreshToken };
