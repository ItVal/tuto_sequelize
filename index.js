const Sequelize = require("sequelize");
const {DataTypes, Op} = Sequelize ;
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
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      length: [4, 6],
    },
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 23,
  },
});

// sync() : crée la table si ça n'exite pas et ne fait rien si elle existe déjà. sync({force : true}) : crée la table si ça n'exite pas et supprime l'autre si ça exite, sync({alter : true}): Si la taple exite déjà dans la db, on la met à jour avec les nouvelles informations du modèle
User.sync({ alter: true });
//   .then(() => {
//     //une insertion des données dans la table
//     return User.create({
//         user_id: 2,
//         username:"Valentin",
//         email:"valnas@gmail.com",
//         password:"valnas123",
//         age: 26
//      })
//   })

//plusieurs insertions à la fois
// return User.bulkCreate([
//     {
//         user_id: 11,
//         username:"G",
//         email:"jonas@gmail.com",
//         password:"jonas123",
//         age: 30
//     },
//     {
//         user_id: 12,
//         username:"Ang",
//         email:"ange@gmail.com",
//         password:"ange123",
//         age: 19
//     },
//     {
//         user_id: 13,
//         username:"Authentic"
//     }
// ], {validate:true})
//autres opérations sur les champs (incrementation, decrementation, ...)
//   .then((data) => {
//     data.increment({age : 2});
//     // console.log("incremention reussi, age égal maintenant à :", data.age);
//   })

//models query (requete) : Attributes => sequelize.fn("SUM, MAX, MIN, AVG"), exclude, include
return User.findAll({
   //attributes: [[sequelize.fn("AVG", sequelize.col("age")), "Moyenne d'Age"]],
   // attributes : {exclude: ['password']} //afiche tout sauf le password
    //attributes : ['username'], where: {age : 30}, //affiche tous les noms dont l'age est égal à 30
   // limit : 2, //affiche les deux première entrées
   // order : [["age", "ASC"]] // trie par ordre croissant (ASC) ou decroissant (DESC)
    // attributes: ["username",
    //             [sequelize.fn("SUM", sequelize.col("age")), "somme d'Age"]], //SELECT `username`, SUM(`age`) AS `somme d'Age` FROM `users` AS `user` GROUP BY `username`;
    // group : 'username' //fait la somme d'age de l'attribut "username" ayant la même valeur. Grouping
    // where: {
    //   [Op.or]: {username: 'Angela', age: 19} //Op.or = ou, Op.and = et, dans ce cas, ç'affiche les elts dont username = Valentin et elts dont age = 19. SELECT `user_id`, `username`, `email`, `password`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE (`user`.`username` = 'Valentin' OR/AND `user`.`age` = 19);
    // },

    where:{
      age:{
        [Op.gt]:21 //Op.gt structement supérieur à >, Op.lt structement inférieur à <, Op.eq structement égal à ==. Dans ce cas,ç'affiche tous les utilisateurs dont age > 21
      }
    }

})
  .then((data) => {
    data.forEach((elt) => {
      console.log(elt.toJSON());
    });
  })
  .catch((err) => console.log("quelques choses s'est mal passée", err));
