const db = require("../models/db");

const getTodos = (req, res) => {
  const query = "SELECT * FROM todos WHERE user_id = ?";

  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch todos" });
    res.json(results);
  });
};

const createTodo = (req, res) => {
  const { title, description } = req.body;
  const query =
    "INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)";

  db.query(query, [title, description, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to create todo" });
    res.status(201).json({ message: "Todo created successfully" });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query =
    "UPDATE todos SET title = ?, description = ? WHERE id = ? AND user_id = ?";

  db.query(query, [title, description, id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to update todo" });
    res.json({ message: "Todo updated successfully" });
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";

  db.query(query, [id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to delete todo" });
    res.json({ message: "Todo deleted successfully" });
  });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
