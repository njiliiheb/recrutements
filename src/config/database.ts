import { Sequelize } from "sequelize";

// Configuration de la connexion à la base de données MySQL via XAMPP
const sequelize = new Sequelize("recrutements", "root", "", {
  host: "localhost",
  dialect: "mysql", // Utilisez "mysql" comme dialecte
  port: 3306, // Port par défaut pour MySQL
});

// Vérification de la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données:", err);
  });

export default sequelize;