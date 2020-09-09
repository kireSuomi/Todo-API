const ToDo = require("../models/todo.model");

exports.getTodos = async function (query, limit) {
  try {
    //Set limit
    const todos = await ToDo.find({}).exec();
    return todos;
  } catch (e) {
    throw Error("Error while Paginating Todos");
  }
};

exports.createTodo = async function (todo) {
  const newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status,
  });

  try {
    const savedTodo = await newTodo.save();
    return savedTodo;
  } catch (e) {
    throw Error("Error while Creating Todo");
  }
};

exports.updateTodo = async function (todo) {
  const id = todo.id;

  let oldTodo = await ToDo.findById(id);

  if (!oldTodo) {
    return false;
  }

  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  try {
    const savedTodo = await oldTodo.save();
    return savedTodo;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
};

exports.deleteTodo = async function (id) {
  try {
    const deleted = await ToDo.deleteOne({ _id: id });

    if (deleted.n === 0) {
      throw Error("Todo Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Todo");
  }
};
