const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

//connexion à la DB
const sequelize = new Sequelize(
  "tuto_sequelize",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

//then and catch method
// sequelize.authenticate()
// .then(() => {
//     console.log("connexion à la database reussi")
// }).catch(err => console.log("connexion à la database échouée", err))

//async await method
const myFunction = async () => {
  await sequelize.authenticate();
  console.log("connexion à la database reussi");
};

myFunction();

//model
const User = sequelize.define("user", {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey:true
    },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 23,
  },
});

// sync() : crée la table si ça n'exite pas et ne fait rien si elle existe déjà. sync({force : true}) : crée la table si ça n'exite pas et supprime l'autre si ça exite, sync({alter : true}): Si la taple exite déjà dans la db, on la met à jour avec les nouvelles informations du modèle
User.sync()
  .then(() => {
    //insertion des données dans la table 
    return User.create({ 
        user_id: 2,
        username:"Valentin",
        email:"valnas@gmail.com",
        password:"valnas123",
        age: 26
     })
  })
  //autres opérations sur les champs (incrementation, decrementation, ...)
  .then((data) => {
    data.increment({age : 2});
    // console.log("incremention reussi, age égal maintenant à :", data.age);
  })
  .catch((err) => console.log("quelques choses s'est mal passée", err));
