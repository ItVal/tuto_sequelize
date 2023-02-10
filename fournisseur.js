const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
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

//async await method
const myFunction = async () => {
  await sequelize.authenticate();
  console.log("connexion à la database reussi");
};
myFunction();

//model
const Fournisseur = sequelize.define("fournisseur", {
  f_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name : {
    type: DataTypes.STRING,

  },
  email : {
    type: DataTypes.STRING,
    unique: true,
    validate : { //validation email correct
        isEmail : true,
    }
  },
  age : {
    type: DataTypes.INTEGER,
    validate : {
        isOldEnough(value) { //validation de l'age
            if (value<18){
                throw new Error ('Vous êtes encore mineur')
            }
        }
    }
  }

})

Fournisseur.sync({ alter: true }).then(() =>{
    return Fournisseur.create({ 
        name : 'A Litongo',
        email : 'alitongo@gmail.com',
        age : 15
    })
}).then((data) =>{
    console.log(data.toJSON())
}).catch((err) =>{
    return console.log('Buuuuuuuu===============uuuuuuuuuuug', err)
})