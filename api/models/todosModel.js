const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todosSchema);

module.exports = Todos;
