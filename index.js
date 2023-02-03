const Sequelize = require('sequelize') ;
const dotenv = require('dotenv');
dotenv.config();

//connexion à la DB
const sequelize = new Sequelize("tuto_sequelize", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost",
} )

//then and catch method
// sequelize.authenticate()
// .then(() => {
//     console.log("connexion à la database reussi")
// }).catch(err => console.log("connexion à la database échouée", err))

//async await method
const myFunction = async () => {
    await sequelize.authenticate()
    console.log("connexion à la database reussi");
}

myFunction();
