const { MongoClient } = require('mongodb');

// Nombre de bd
const dbName = 'erp_';
// Conexión URL (estas corriendo en local :D)
const url = 'mongodb://localhost:3000';

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();

  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};



// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:3000/erp_');

// // console.log("mongoose",mongoose)
// module.exports = mongoose;


