const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

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
  try {
    const db = await connection();
    // console.log("req.query -- ", req.body);
    const { username, contrasena } = req.body;
    const persona = await db
      .collection("persona")
      .find({ "user.username": username })
      .toArray();

    const match = await bcrypt.compare(contrasena, persona[0].user.password);
    if (!match) {
      throw new Error({ err: "Usuario o clave no registrada" });
    } else {
      const token = jwt.sign(
        {
          check: true,
        },
        app.get("key"),
        {
          expiresIn: "24d",
        }
      );
      console.log("token -->", token);
      return res.json({
        token,
        persona,
      });
    }
  } catch (err) {
    // console.log("err 00 ",err)
    res.status(500).send({ err, token: null });
  }

  // console.log("Local");
  // res.status(200).send({ msg: "mensaje desde controlador", status: true });
};

module.exports = {
  getAuth,
};
