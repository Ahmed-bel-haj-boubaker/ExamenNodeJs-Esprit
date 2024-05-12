const Joueur = require("../model/Joueur");

exports.addJoueur = async (req, res) => {
  const user = req.body;

  const newJoueur = await Joueur.create(user);

  res.status(201).json({
    data: newJoueur,
    message: `Le joueur a été ajouté avec succes: ${user.pseudo}`,
  });
};

exports.getAllJoueur = async (req, res) => {
  const joueur = await Joueur.find();

  res.status(200).json({ data: joueur });
};

exports.getJoueur = async (req, res) => {
  const joueur = await Joueur.findById(req.params.id);

  if (!joueur) {
    return res
      .status(404)
      .json({ message: `pas de joueur avec cette id=${req.params.id}` });
  }

  res.status(200).json({ data: joueur });
};

exports.deleteJoueur = async (req, res) => {
  const joueur = await Joueur.findByIdAndDelete(req.params.id);
  if (!joueur) {
    return res
      .status(404)
      .json({ message: `pas de joueur avec cette id=${req.params.id}` });
  }

  return res
    .status(200)
    .json({ data: joueur, message: `joueur supprimer avec succes` });
};


