const mongoose = require("../config/datastore"),Schema = mongoose.Schema;

//   userSchema = require("./schemas").userSchema;

const models = {
  User: mongoose.model("user", new Schema({})),
};

module.exports = models;
