const connection = require("../config/datastore");

get = async (req, res) => {
  const db = await connection();
  const data = await db
    .collection("persona")
    .find({
      // insertamos un usuario
      // name: '11111'
    })
    .toArray();
  // console.log("info", data);
  return res.status(200).send({ status: true, data });
};

prueba = (req, res) => {
  console.log("Local");
  res
    .status(200)
    .send({ data: [{ nombre: "angularjs" }, { nombre: "react JS" }] });
};

module.exports = {
  prueba,
  get,
};
