const { Router } = require('express')
const { db, TaskManager, TaskNotes } = require('../Database/database')

const route = Router()

route.get('/:sortvalue', async(req, res) => {
  // const sort = document.getElementById('sortby').value
  const sort = req.params.sortvalue;
  const tasks = await TaskManager.findAll({
      order: [
          [sort, 'DESC']
      ]
  })
  res.send(tasks)
})

route.get('/', async (req, res) => {
    const tasks = await TaskManager.findAll()
    res.send(tasks)
})

route.post('/', async (req, res) => {
    if (typeof req.body.task === null) {
      return res.status(400).send({ error: 'Task name not provided' })
    }
    
  
    const newTask = await TaskManager.create({
        task: req.body.task,
        due: req.body.due,
        status: req.body.status,
        priority: req.body.priority,
        description: req.body.description,
        note: req.body.notes,
    })
  
    res.status(201).send({ success: 'Notes for the task has been added', data: newTask })
  })

  route.get('/:id', async (req, res) => {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({
        error: 'task id must be an integer',
      })
  }
  task = await TaskManager.findAll(
    { where: { id: req.params.id } }
  )

  res.sendStatus(200).send(task)
})

route.patch('/:id',async (req,res)=>{
  console.log("patch hit")
  if(isNaN(Number(req.params.id))){
      return res.status(400).send({
          error: 'Todo ID must be an integer'
      })
  }

  const task = await TaskManager.findByPk(req.params.id)

  if(!task){
      return res.status(404).send({
          error: " No Todo found with id = " + req.params.id
      })
  }
      
      task.duedate =  req.body.update_duedate
      task.priority =  req.body.update_priority
      //  if(todo.status !== req.body.update_status){
      task.status= req.body.update_status
      
           //db save
           await task.save()
      res.status(201).send({success:"Updated Successfully",data:task})
})
   
    
    route.get('/:id/notes', async (req, res) => {
      if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'task id must be an integer',
        })
      }
      taskNotes = await TaskNotes.findAll(
        { where: { TaskManagerId: req.params.id } }
      )
      res.send(taskNotes)
  })

    route.post('/:id/notes', async (req, res) => {
      if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'task id must be an integer',
        })
    }
    const taskNotes = await TaskNotes.create({
      notes:req.body.notes,
      TaskManagerId:req.params.id

  })

  res.status(201).send({ success: 'Notes for the task has been added', data: taskNotes })
  })
    
module.exports = route