const mongoose = require("mongoose");

const joueurSchema = new mongoose.Schema({
  pseudo: {
    type: String,
  },
  sante: {
    type: Number,
  },
  score: {
    type: Number,
  },
});

const Joueur = mongoose.model("Joueur", joueurSchema);
module.exports = Joueur;
