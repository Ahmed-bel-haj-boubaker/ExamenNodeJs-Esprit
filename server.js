const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./bd/DbConnection");
const JoueurRoute = require("./route/JoueurRoutes");
const PartieRoute = require("./route/PartieRoutes");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const Joueur = require("./model/Joueur");
const Partie = require("./model/Partie");

dotenv.config({ path: ".env" });

dbConnection();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("nouvellePartie", async (partie) => {
    const { nom, idJoueur1, idJoueur2 } = partie;

    try {
      const joueur1 = await Joueur.findById(idJoueur1).select("pseudo");
      const joueur2 = await Joueur.findById(idJoueur2).select("pseudo");
      console.log(joueur2);
      if (!joueur1 || !joueur2) {
        throw new Error("Joueur(s) introuvable(s)");
      }

      const newPartie = new Partie({
        nom,
        joueur1,
        joueur2,
        etat: "en cours",
      });

      await newPartie.save();
      console.log(newPartie);

      io.emit("partieNotif", newPartie);
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("getPlayersInfo", async (partie) => {
    try {
      const { idJoueur1, idJoueur2 } = partie;

      const joueur1Info = await Joueur.findById(idJoueur1).select(
        "pseudo score sante"
      ); 
      const joueur2Info = await Joueur.findById(idJoueur2).select(
        "pseudo score sante"
      );

      io.emit("playersInfo", {
        joueur1: joueur1Info,
        joueur2: joueur2Info,
      });
    } catch (error) {
      console.error("Error retrieving player information:", error);
      socket.emit("error", { message: "Error fetching player stats" }); 
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/user", JoueurRoute);
app.use("/user", PartieRoute);
app.get("/game", (req, res) => {
  res.render("partie");
});
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});
