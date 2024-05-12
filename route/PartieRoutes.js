const express = require("express");
const { attaque, addPartie } = require("../controller/PartieController");

const Router = express.Router();
Router.route("/attaque/:idAtt/:idVic").put(attaque);
Router.route("/newPartie/:idJoueur1/:idJoueur2").post(addPartie);
module.exports = Router;
