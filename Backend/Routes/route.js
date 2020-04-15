const { Router } = require('express')
const { TaskManager } = require('../Database/database')

const route = Router()

route.get('/', async (req, res) => {
    const tasks = await TaskManager.All()
    res.send(tasks)
})

route.post('/', async (req, res) => {
    if (typeof req.body.task !== 'string') {
      return res.status(400).send({ error: 'Task name not provided' })
    }
    
  
    const newTodo = await TaskManager.create({
        task: req.body.task,
        due: req.body.due,
        status: req.body.status,
        priority: req.body.priority,
        description: req.body.description,
    })
  
    res.status(201).send({ success: 'New task added', data: newTodo })
  })

  route.get('/:id', async (req, res) => {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({
        error: 'task id must be an integer',
      })
  }})

    route.patch('/:id', async (req, res) => {
      if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'task id must be an integer',
        })
    }})
    
    route.get('/:id/notes', async (req, res) => {
      if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'task id must be an integer',
        })
    }})

    route.post('/:id/notes', async (req, res) => {
      if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'task id must be an integer',
        })
    }
    const newTodo = await TaskManager.create({
      task: req.body.task,
      due: req.body.due,
      status: req.body.status,
      priority: req.body.priority,
      description: req.body.description,
      notes: req.body.notes
  })

  res.status(201).send({ success: 'Notes for the task has been added', data: newTodo })
  })
    
module.exports = route