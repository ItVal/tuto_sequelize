const Sequelize = require('sequelize') ;
const dotenv = require('dotenv');
dotenv.config();

//connexion à la DB
const sequelize = new Sequelize("tuto_sequelize", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost",
} )

sequelize.authenticate()
.then(() => {
    console.log("connexion à la database reussi")
}).catch(err => console.log("connexion à la database reussi", err))