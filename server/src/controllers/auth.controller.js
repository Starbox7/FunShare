const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

// Access Token 생성
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

// Refresh Token 생성
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

// 회원가입
const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.query(query, [username, hashedPassword], (err) => {
    if (err) return res.status(500).json({ message: "Registration failed" });
    res.status(201).json({ message: "User registered successfully" });
  });
};

// 로그인
const login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const saveQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";
    db.query(saveQuery, [refreshToken, user.id], (saveErr) => {
      if (saveErr)
        return res
          .status(500)
          .json({ message: "Failed to save refresh token" });
      res.json({ accessToken, refreshToken });
    });
  });
};

// Access Token 재발급
const refreshToken = (req, res) => {
  const user = req.user;
  const newAccessToken = generateAccessToken(user);
  res.json({ accessToken: newAccessToken });
};

// 로그아웃
const logout = (req, res) => {
  const { id } = req.user;

  const query = "UPDATE users SET refresh_token = NULL WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to logout" });
    res.json({ message: "Logout successful" });
  });
};

module.exports = { register, login, refreshToken, logout };
