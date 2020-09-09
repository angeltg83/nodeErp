const express = require("express");
const app = express();

const jwt = require("jsonwebtoken"),
  config = require("../config/config");
app.set("key", config.key);

const connection = require("../config/datastore");


getAuth = async (req, res) => {
  // console.log("eq.body",req)

  const db = await connection();
  
  let {username,contrasena} = req.body;

  const persona = await db
  .collection("persona")
  .find({'users.username': username,'users.password':contrasena})
  .toArray();

  console.log("persona ",persona)
  let users = persona[0].users;
  for (const i of users) {
    
  }

  if (req.body.username === "angel.tigua83@gmail.com" && req.body.contrasena === "12345") {
  
   
    // console.log("ENTRO!!");
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: '24d',
    });
    res.json({
      status: true,
      token,
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
  // console.log("Local");
  // res.status(200).send({ msg: "mensaje desde controlador", status: true });
};

module.exports = {
  getAuth,
};
