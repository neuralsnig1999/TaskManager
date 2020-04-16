
// let submit = document.getElementById('button')

async function addTask() {
  const title = document.getElementById('task').value
  const description = document.getElementById('desc').value
  const status = $("input[name='task-status']:checked").val()
  const duedate = document.getElementById('due').value
  const priority = $("input[name='priority']:checked").val()
  const note = document.getElementById('notes').value

  addNewTodoJson(title, description, duedate, status, priority, note)
}


async function addNewTodoJson(title, description, duedate, status, priority, note) {

  const resp = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, duedate, status, priority, note })
  })

}


