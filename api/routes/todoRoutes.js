const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

// GET ALL TODOS
router.get("/", getAllTodos);

// CREATE NEW TODO
router.post("/", createTodo);

// GET SINGLE TODO
router.get("/:id", getTodo);

// UPDATE TODO
router.patch("/:id", updateTodo);

// DELETE TODO
router.delete("/:id", deleteTodo);

module.exports = router;
