const Joueur = require("../model/Joueur");
const Partie = require("../model/Partie");
const server = require("../server");

exports.attaque = async (req, res) => {
  const attaquant = await Joueur.findById(req.params.idAtt);
  if (!attaquant) {
    return res
      .status(404)
      .json({ message: `pas d'attaquant avec cette id=${req.params.idAtt}` });
  }

  const victime = await Joueur.findById(req.params.idVic);

  if (!victime) {
    return res
      .status(404)
      .json({ message: `pas de victime avec cette id=${req.params.idVic}` });
  }

  victime.sante = victime.sante - 20;
  await victime.save();

  attaquant.score = attaquant.score + 10;
  await attaquant.save();

  res
    .status(200)
    .json({ message: "apres attaque", attaquant: attaquant, victime: victime });
};

exports.addPartie = async (req, res) => {
  const joueur1 = await Joueur.findById(req.params.idJoueur1);
  if (!joueur1) {
    return res
      .status(404)
      .json({ message: `pas de joueur avec cette id=${req.params.idJoueur1}` });
  }
  const joueur2 = await Joueur.findById(req.params.idJoueur2);

  if (!joueur2) {
    return res
      .status(404)
      .json({ message: `pas de joueur avec cette id=${req.params.idJoueur2}` });
  }
  const partie = new Partie(req.body);

  partie.joueur1 = joueur1._id;
  partie.joueur2 = joueur2._id;
  partie.etat = "en cours";

  await partie.save();

  res.status(201).json({ message: "partie cree avec succes", data: partie });
};
