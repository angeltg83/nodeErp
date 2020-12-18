const express = require("express");
const app = express();

const jwt = require("jsonwebtoken"),
  config = require("../config/config");
app.set("key", config.key);

const connection = require("../config/datastore");

/**
 * @author Angel Tigua
 * @param {json} username,contrasena
 * @description verifica contra la base de dato si un usuario es valido, luego se emite un jwt
 * @since 2020.12.18
 * @returns {json} token
 */
getAuth = async (req, res) => {
  const db = await connection();
  // console.log("req --- ", req);
  const { username, contrasena } = req.body;
  const persona = await db
    .collection("persona")
    .find({ "user.username": username, "user.password": contrasena })
    .toArray();

  console.log("persona find ", persona);
  const { user } = persona[0];

  if (username === user.username && contrasena === user.password) {
    // console.log("ENTRO!!");
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: "24d",
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
