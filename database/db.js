const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("testbase1", "root", "mysql", {
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

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db