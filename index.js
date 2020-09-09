const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const app = express();

const index = require("./routes/index.route");
const api = require("./routes/api.route");

const mongoUrl = "mongodb://127.0.0.1:27017/todoapp";
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoUrl, mongoOptions).then(() => {
  console.log("Mongoose database connection established");
});

//Allow Cors
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//Set up routes
app.use("/", index);
app.use("/api", api);

const server = http.createServer(app);
server.listen(3000, () => {
  console.clear();
  console.log("Server running on port: 3000");
});
