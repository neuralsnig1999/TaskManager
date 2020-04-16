const express = require('express')
const { db } = require('./Database/database')
const taskRoute = require('./Routes/route')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/Frontend'))
app.use('/tasks', taskRoute)

const port = process.env.PORT || 8080;

db.sync()
  .then(() => {
    app.listen(port, function(){
        console.log("Listening to port "+port)
    })
  })
  .catch((err) => {
    console.error(err)
  })

