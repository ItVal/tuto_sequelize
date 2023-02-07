const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
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

const Student = sequelize.define("Student", {
    students_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNullValues: false,
        validate: {
            len:[4-20]                                                                   
        }  
    },
    favorite_class: {
        type: DataTypes.STRING(25),
        defaultValue: "Computer Science"
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNullValues: false
    },
    subscribed_to_wittcode: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timesTamps : false,
})
Student.sync ({alter : true}).then (() =>{
    console.log("table created");
    Student.bulkCreate([
        {
            name: "James LeBron ",
            school_year: 9,

        },
        {
            name: "James LeBron ",
            favorite_class: "Football",
            school_year: 8,
            subscribed_to_wittcode: false
        },
        {
            name: "Safi Getrude",
            favorite_class: "BasketBall",
            school_year: 6,
            subscribed_to_wittcode: true
        },
        {
            name: "ValNasNvj",
            favorite_class: "VolleyBall",
            school_year: 10,
            subscribed_to_wittcode: false
        },
        {
            name: "Admin Atete",
            school_year: 12,

        },
    ], {validate : true})
}).catch (err => console.error(err));