const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("mathLearningDB", "Dylan","mysql", {
    host : '159.89.159.138',
    port : '3306',
    dialect: 'mysql',
    operatersAliases: false,

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },

    dialectOptions:{
	socketPath: "/var/run/mysqld/mysqld.sock"
    }
})
//creates new instance of Sequelize that connects to the mathLearningDB
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
