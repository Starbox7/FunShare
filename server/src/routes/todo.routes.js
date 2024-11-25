const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const { authenticateAccessToken } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", authenticateAccessToken, getTodos);
router.post("/", authenticateAccessToken, createTodo);
router.put("/:id", authenticateAccessToken, updateTodo);
router.delete("/:id", authenticateAccessToken, deleteTodo);

module.exports = router;
