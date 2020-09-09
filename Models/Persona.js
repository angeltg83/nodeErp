const mongoose = require("../config/datastore"),
  Schema = mongoose.Schema;

module.exports = {
  Persona: mongoose.model("persona", new Schema({})),
};
