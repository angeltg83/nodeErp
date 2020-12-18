const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config/config");
var cors = require("cors");

const app = express();

app.set("key", config.key);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const UsuarioController = require("./Controllers/UsuarioController");
const AuthController = require("./Controllers/AuthController");

const ExerciseController = require("./Controllers/ExerciseController");

app.options('*', cors())
app.use(express.Router());

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.headers["access-token"];
  console.log("TOKEN ", token);
  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

app.get("/prueba", rutasProtegidas, UsuarioController.prueba);
app.get("/get", rutasProtegidas, UsuarioController.get);
app.post("/auth", AuthController.getAuth);

// app.get("/excersices", cors(), ExerciseController.exercises);
// app.post("/excersiceNew",cors(),ExerciseController.excersiceNew);

module.exports = app;
