const mongoose = require("mongoose");

const partieSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  joueur1: {
    type: mongoose.Schema.ObjectId,
    ref: "Joueur",
  },
  joueur2: {
    type: mongoose.Schema.ObjectId,
    ref: "Joueur",
  },
  etat: { type: String },
});

const Partie = mongoose.model("Partie", partieSchema);
module.exports = Partie;
