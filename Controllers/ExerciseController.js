const connection = require("../config/datastore");

exercises = async (req, res) => {
  const db = await connection();
  const data = await db
    .collection("exercises")
    .find({
      // insertamos un usuario
      // name: '11111'
    })
    .toArray();
  // console.log("info", data);
  return res.status(200).send({ data });
};

excersiceNew = async (req, res) => {
  const db = await connection();

  // let {username,contrasena} = req.body;
  console.log("\nreq.body",req.body);

  const data = await db
    .collection("exercises")
    .insertOne(req.body);

  console.log("info", data);
  
  return res.status(200).send({ data });
};

prueba = (req, res) => {
  console.log("Local");
  res
    .status(200)
    .send({ data: [{ nombre: "angularjs" }, { nombre: "react JS" }] });
};

module.exports = {
  prueba,
  exercises,
  excersiceNew,
};
