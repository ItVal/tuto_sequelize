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
const Country = sequelize.define(
  "country",
  {
    contryName: {
      type: DataTypes.STRING,
      unique: true,
    }
  },
  {
    timestamps: false,
  }
);
const Capital = sequelize.define(
    "capital",
    {
      capitalName: {
        type: DataTypes.STRING,
        unique: true,
      }
    },
    {
      timestamps: false,
    }
  );
Country.hasOne(Capital);

sequelize.sync({alter: true}).then(() => {
    //insertions
    Country.bulkCreate([
        {
            contryName: "DR Congo"
        },
        {
            contryName: "Rwanda"
        },
        {
            contryName: "Belgique"
        },
        {
            contryName: "France"
        },
    ]);

Capital.bulkCreate([
    {
        capitalName : "Kinshasa"
    },
    {
        capitalName : "Kigali"
    },
    {
        capitalName : "Bruxel"
    },
    {
        capitalName : "Paris"
    },
])

}).catch(err => {
    console.log("quelques choses s'est mal passé", err);
})