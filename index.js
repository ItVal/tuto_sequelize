const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");

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
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    get() { //getters : recuperation des données en majuscule
      const myMajValue = this.getDataValue('username');
      return myMajValue.toUpperCase();
    }
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    set(value) { //Setters () permet d'hasher le mot de passe avant de le stocké dans la data base
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    }
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 23,
  },
});

// sync() : crée la table si ça n'exite pas et ne fait rien si elle existe déjà. sync({force : true}) : crée la table si ça n'exite pas et supprime l'autre si ça exite, sync({alter : true}): Si la taple exite déjà dans la db, on la met à jour avec les nouvelles informations du modèle
User.sync({ alter: true }).then(() => {
return User.create({
  user_id : 30,
  username: 'leila specteur',
  password: "leila Specteur"
})

}).then((data) => {
      console.log(data.username);
      console.log(data.password);
  })
  .catch((err) => {
    console.log("quelques choses s'est mal passée", err)
  });
