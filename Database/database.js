const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/Task&NotesManager.db'
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
        defaultValue: Sequelize.NOW 
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
    note: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

// const TaskNotes = db.define('TaskNotes', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     notes: {
//         type: Sequelize.STRING,
//         allowNull:true
//     }})

//     TaskManager.hasMany(TaskNotes);
// // to check if db created or not
db.sync()
        .then(() => console.log('Database Syncing.'))
        .catch((err) => console.log(err))

module.exports = {
    db, TaskManager
}
