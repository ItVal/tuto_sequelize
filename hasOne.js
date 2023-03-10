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
    },
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
    },
  },
  {
    timestamps: false,
  }
);
//hasOne : relation un-à-un : capital qui reçoit la clé(étrangère) de country
//Country.hasOne(Capital);  
//belongsTo : relation un-à-un : capital qui reçoit tjrs la clé(étrangère) de country
//Capital.belongsTo(Country);  

//Suppression en cascade de la clé étrangère
// Country.hasOne(Capital, {onDelete: "CASCADE"});  
// Capital.belongsTo(Country, {onDelete: "CASCADE"});

//MAJ de l'affectation d'une clé étrangère
Country.hasOne(Capital, {onUpdate: "CASCADE"});  


let country, capital;
sequelize
  .sync({ alter: true })
  .then(() => {
    //insertions
    //     Country.bulkCreate([
    //         {
    //             contryName: "DR Congo"
    //         },
    //         {
    //             contryName: "Rwanda"
    //         },
    //         {
    //             contryName: "Belgique"
    //         },
    //         {
    //             contryName: "France"
    //         },
    //     ]);

    // Capital.bulkCreate([
    //     {
    //         capitalName : "Kinshasa"
    //     },
    //     {
    //         capitalName : "Kigali"
    //     },
    //     {
    //         capitalName : "Bruxel"
    //     },
    //     {
    //         capitalName : "Paris"
    //     },
    // ])

    //affectation hasOne
    //     return Capital.findOne({ where: { capitalName: "Kinshasa" } });
    //   })
    //   .then((data) => {
    //     capital = data;
    //     return Country.findOne({ where: { contryName: "DR Congo" } });
    //   })
    //   .then((data) => {
    //     country = data;
    //     country.setCapital(capital);
    //   })

    //visualisation pays - capital
  //   return Country.findOne({ where: { contryName: "DR Congo" } });
  // })
  // .then((data) => {
  //   country = data;
  //   return country.getCapital();
  // })
  // .then((data) => {
  //   console.log(data.toJSON());
  // })
  // .catch((err) => {
  //   console.log("quelques choses s'est mal passé", err);
  // });

  //creation d'un champs et l'affecter direction avec sa cléf étrangère
//   return Country.create({ contryName: "USA" });
// })
// .then((data) => {
//   country = data;
//   return country.createCapital({ capitalName : "Washington, D.C "});
// })
// .then((data) => {
//   console.log(data.toJSON());
// })

 //affectation belongsTo
      //   return Country.findOne({ where: { contryName: "France" } });
      // })
      // .then((data) => {
      //   country = data;

      //   return Capital.findOne({ where: { capitalName: "Paris" } });
      // })
      // .then((data) => {
      //   capital = data;
      //   capital.setCountry(country);
      // })

      //Suppression en cascade de la clée étranère 
      //    return Country.destroy({ where: { contryName: "France" } });
      // })
      // .then((data) => {
      //   console.log(data);
      // })

// Maj Affectation d'une clé étrangère 
        return Country.findOne({ where: { contryName: "Belgique" } });
      })
      .then((data) => {
        country = data;
        return Capital.findOne({ where: { capitalName: "Paris" } });
      })
      .then((data) => {
        capital = data;
        country.setCapital(capital);
      })
.catch((err) => {
  console.log("quelques choses s'est mal passé", err);
});