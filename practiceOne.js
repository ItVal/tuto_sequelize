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
})
Student.sync ().then (() =>{
    console.log("table created");
}).catch (err => console.error(err));