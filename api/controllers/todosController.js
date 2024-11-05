const Todos = require("../models/todosModel");
const mongoose = require("mongoose");

// GET ALL TODOS
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TODO
const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create new todo
const createTodo = async (req, res) => {
  const { title, description, completed } = req.body;

  // Check if the required fields are provided
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    const newTodo = await Todos.create({
      title,
      description,
      completed: completed || false,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No todo with that id");
  }

  try {
    // Create an empty object to hold the fields to update
    const updateFields = {};

    // Add the fields to update if they are provided in the request body
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (completed !== undefined) updateFields.completed = completed;

    // Find the todo by ID and update it with the fields in updateFields
    const updatedTodo = await Todos.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true } // Return updated document and run validations
    );

    // If the todo is not found, return 404
    if (!updatedTodo) {
      return res.status(404).send("No todo with that id");
    }

    // Respond with the updated todo
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No todo with that id");
  }
  try {
    await Todos.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
