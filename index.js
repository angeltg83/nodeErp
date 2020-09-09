const express = require("express");
// const config = require('./config/config')



// const bodyParser = require("body-parser");
const app = express();


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const UsuarioController = require('./Controllers/UsuarioController');

const port = 7000;

// Para ejecutar, en la raiz del proyecto 
// node index.js

const routes = require("./routes");

// app.use(express.Router());

app.use("/", routes);

app.listen(port, () => {
  console.info("starting server in port : ", port);
});
