const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("test", "root", "newpassword", {
    host : 'localhost',
    dialect: 'mysql',
    operatersAliases: false,

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
})
//creates new instance of Sequelize that connects to the mathLearningDB
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
