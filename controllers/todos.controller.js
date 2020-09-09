var TodoService = require("../services/todos.service");

exports.getTodos = async function (req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    var todos = await TodoService.getTodos({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: todos,
      message: "Succesfully Todos Recieved",
    });
  } catch (e) {
    console.log("todos.controller.js/getTodos: ", e.message);
    return res
      .status(400)
      .json({ status: 400, message: "Could not get todos" });
  }
};

exports.createTodo = async function (req, res, next) {
  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };

  try {
    var createdTodo = await TodoService.createTodo(todo);
    return res.status(201).json({
      status: 201,
      data: createdTodo,
      message: "Succesfully Created ToDo",
    });
  } catch (e) {
    console.log("todos.controller.js/createTodo:", e.message);
    return res
      .status(400)

      .json({ status: 400, message: "Todo Creation was Unsuccesfull" });
  }
};

exports.updateTodo = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: "Id must be present" });
  }

  var id = req.body._id;

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null,
  };

  try {
    var updatedTodo = await TodoService.updateTodo(todo);
    return res.status(200).json({
      status: 200,
      data: updatedTodo,
      message: "Succesfully Updated Todo",
    });
  } catch (e) {
    console.log("todos.controller.js/updateTodo: ", e.message);
    return res.status(400).json({ status: 400, message: "Update todo failed" });
  }
};

exports.removeTodo = async function (req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await TodoService.deleteTodo(id);
    console.log(deleted);
    return res
      .status(204)
      .json({ status: 204, message: "Succesfully Deleted Todo" });
  } catch (e) {
    console.log("todos.controller.js/removeTodo: ", e.message);
    return res.status(400).json({ status: 400, message: "Remove todo failed" });
  }
};
