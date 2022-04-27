let { Sequelize, DataTypes } = require ('sequelize')

let env = process.env.NODE_ENV || 'development'  //spelling fixed

//if app is running at Herokie, Heroku will have set an enviornment vaiable
// called NODE_ENV which will have the value 'production' so the ENV variable
// in this code will be 'prodution'

// if the app is running on your computer, then ENV will be 'development'
// app will use SQlite

let config = require(__dirname + '/../config.json')[env]

let db = {}

let sequelize

if (config.use_env_variable) {
    // at Herokie, use postgres
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(config)
}

let studentModel = require('./student')(sequelize, DataTypes) 

db[studentModel.name] = studentModel

db.sequelize = sequelize // information on how to connect to the database
db.Sequelize = Sequelize // reference to sequelize library 

module.exports = db