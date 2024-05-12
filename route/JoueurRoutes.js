const express = require("express");
const {
  addJoueur,
  getAllJoueur,
  getJoueur,
  deleteJoueur,
} = require("../controller/JoeurController");

const Router = express.Router();

Router.route("/newJoueur").post(addJoueur);
Router.route("/getAllJoueur").get(getAllJoueur);
Router.route("/getJoueur/:id").get(getJoueur);
Router.route("/deleteJoueur/:id").get(deleteJoueur);
module.exports = Router;
