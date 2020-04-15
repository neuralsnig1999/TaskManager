const Sequelize = require('sequelize')
 
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/NodeJs.db'
})
 
const TaskManager = db.define('TaskManager', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    due: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW + 1
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: 'incomplete'
    },
    priority: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: 'medium'
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Notes: {
        type: Sequelize.STRING,
        allowNull: true,
    }  
})
 
module.exports = {
    db, TaskManager
}