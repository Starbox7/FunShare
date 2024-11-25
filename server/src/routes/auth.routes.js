const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");
const {
  authenticateAccessToken,
  authenticateRefreshToken,
} = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token", authenticateRefreshToken, refreshToken);
router.post("/logout", authenticateAccessToken, logout);

module.exports = router;
