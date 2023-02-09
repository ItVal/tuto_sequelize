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

const Student = sequelize.define(
  "Student",
  {
    students_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNullValues: false,
      validate: {
        len: [4 - 20],
      },
      get() { //getters : recuperation des données en majuscule
        const recupereValEnMajuscule = this.getDataValue('name');
        return recupereValEnMajuscule.toUpperCase();
      }
    },
    favorite_class: {
      type: DataTypes.STRING(25),
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNullValues: false,
    },
    subscribed_to_wittcode: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timesTamps: false,
  }
);
Student.sync({ alter: true })
  .then(() => {
    console.log("table created");
    //entrer des données dans notre table student
    // Student.bulkCreate([
    //     {
    //         name: "James LeBron ",
    //         school_year: 9,

    //     },
    //     {
    //         name: "James LeBron ",
    //         favorite_class: "Football",
    //         school_year: 8,
    //         subscribed_to_wittcode: false
    //     },
    //     {
    //         name: "Safi Getrude",
    //         favorite_class: "BasketBall",
    //         school_year: 6,
    //         subscribed_to_wittcode: true
    //     },
    //     {
    //         name: "ValNasNvj",
    //         favorite_class: "VolleyBall",
    //         school_year: 10,
    //         subscribed_to_wittcode: false
    //     },
    //     {
    //         name: "Admin Atete",
    //         school_year: 12,

    //     },
    // ], {validate : true})
    //requetes : SELECT `students_id`, `name`, `favorite_class`, `school_year`, `subscribed_to_wittcode`, `createdAt`, `updatedAt` FROM `Student` AS `Student` WHERE (`Student`.`favorite_class` = 'Computer Science' OR `Student`.`subscribed_to_wittcode` = true);
    // return Student.findAll({
    //   where: {
    //     [Op.or]: {
    //       favorite_class: 'Computer Science',
    //       subscribed_to_wittcode: true
    //     }
    //   }});

    //requete : selectionn, compte et groupe le nmbre d'étudiants par school_year. SELECT `school_year`, COUNT(`school_year`) AS `nber_student` FROM `Student` AS `Student` GROUP BY `school_year`;
    //     return Student.findAll({
    //         attributes: [
    //             'school_year',
    //             [sequelize.fn('COUNT', sequelize.col('school_year')), 'nber_student']
    //         ],
    //         group : 'school_year'
    //     });

    //   }).then((data) => {
    //     data.forEach((elt) => {
    //       console.log(elt.toJSON());
    //     });
    //   })

    //autre méthode que toJson() pour afficher les données d'une table en console
    // return Student.findAll();
    // return Student.findAll({ row:true});
    // return Student.findAll({
    //     where : { school_year: 8 },
    //     raw : true
    // });

    //FindByPk() : trouve une clé primaire
    // return Student.findByPk(4);

    //FindOne() : trouve un élément suivant un critère
    // return Student.findOne({
    //     where : {
    //         school_year : {
    //             [Op.or] : {
    //                 [Op.lt] : 12,
    //                 [Op.eq] : null,
    //             }
    //         }
    //     }
    // });

    //findOrCreate() : trouve un élément s'il existe et en crée un s'il n'existe pas encore
    // return Student.findOrCreate({
    //   where: {
    //     name: "Angel@l NVJ"
    //   },
    //   defaults : {
    //     school_year: 20
    //   }
    // });

 //findAndCountAll() : trouve les éléments s'ils existent et les comptes
//  return Student.findOne({
//     where: {
//       name: "Angel@l NVJ"
//     },
//     raw : true
//   });

    return Student.findOne();
  }).then((data) => {
    // console.log(data); utilisé pour les précedentes méthoes
    //utiliser avec findAndCountAll()
    // const { count, rows} = data;
    // console.log(count); 
    // console.log(rows); 

    console.log(data.name);

  })
  .catch((err) => console.error("Quelque chose s'est mal passé", err));
