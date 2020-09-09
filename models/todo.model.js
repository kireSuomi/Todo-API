var mongoose = require("mongoose");

var ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: Boolean,
});

const ToDo = mongoose.model("Todo", ToDoSchema);

module.exports = ToDo;
