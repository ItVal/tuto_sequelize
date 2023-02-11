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
  password : {
    type: DataTypes.STRING,
  },
  email : {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate : { //validation email correct
        // isEmail : true,
       // isIn : ['val@litongo.org', 'val@litongo.cd'], //ici on impose que pour chaque entrée sur ce champ, que ça soit seulement une parmi les adresses spécifier ici
        myEmailValidator(value) {//interdir que ce cham soit null (sans valeur). càd le rendre obligatoire
            if (value == null) {
                throw new Error ("Email can't be null");
            }
        }
    }
  },
  age : {
    type: DataTypes.INTEGER,
    defaultValue: 18,
    validate : {
        isOldEnough(value) { //validation de l'age
            if (value<18){
                throw new Error ('Vous êtes encore mineur')
            }
        },
        isNumeric: { //impose que les valeurs entrées sur ce champ ne soient que de chiffres
            msg: "Entrez uniquement les chiffre svp"
        }
    }
  }

},
{
    //function validation 
    validate: {
        usernamePasswordMatch(){
            if(this.name == this.password){
                throw new Error("name and password can't be the same")
            }else{
                console.log("success")
            }
        }
    }
})

Fournisseur.sync({ alter: true }).then(() =>{
    // return Fournisseur.create({ 
    //     name : 'A Litongo',
    //     password: 'A Litongo',
    //     email : null,
    //     age : 25
    // })
    //return sequelize.query(`UPDATE fournisseurs SET age = 50 WHERE name = 'A Litongo'`)
    return sequelize.query(`SELECT * FROM fournisseurs`, {type : sequelize.QueryTypes.SELECT})

  }).then((data) =>{
    [result, metadata] = data;
    console.log(result);
    console.log(metadata);
}).catch((err) =>{
    return console.log('Buuuuuuuu===============uuuuuuuuuuug', err)
})