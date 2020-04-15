const express = require('express')
const { db } = require('./Database/database')
const taskRoute = require('./Routes/route')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + './Frontend/index'))
app.use('/tasks', taskRoute)



db.sync()
  .then(() => {
    app.listen(8080, function(){
        console.log("Listening to port 3232.")
    })
  })
  .catch((err) => {
    console.error(err)
  })
