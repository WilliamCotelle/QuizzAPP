// Charger les variables d'environnement
require("dotenv").config();
console.log('Database URL:', process.env.PG_URL);


// Importer les dependances
const express = require("express");
const router = require("./src/router");
const expressSession = require('express-session')


// Création de l'application express
const app = express();

// Configurer le view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// On expose le contenu du dossier public au reste du monde
app.use(express.static("public")); // Ca revient à déclarer une route par fichier en quelque sorte

// Notre body parser pour les requêtes POST
app.use(express.urlencoded({ extended: true }));

// On plug le router
app.use(router);



app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
  }
}));


// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
