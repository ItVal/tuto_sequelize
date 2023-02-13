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

//modèle
const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

Post.sync({ alter: true }).then(() => {
  console.log("table created");
  return Post.destroy({where : { title: 'MY training' }}).then(() => {
    console.log("table deleted");
  }).catch((err) => {
    console.log(err);
  })
})
.catch((err) => console.log("Quelque chose s'est mal passé", err));

