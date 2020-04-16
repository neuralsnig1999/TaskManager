$(function(){
    const addTaskButton = $("input[id='button']")
   
    addTaskButton.click(function(){

    let task = $("input[id='task']").val()
    let taskDueDate = $("input[id='due']").val()    
    let taskStatus = $("input[name='task-status']:checked").val()
    let taskPriority = $("input[name='priority']:checked").val()
    let taskDescription = $("input[id='desc']").val()
    let taskNotes =  $("input[id='notes']").val()
    
    

    $.post(
        "/tasks",
        {task: task, due: taskDueDate, status: taskStatus, priority:taskPriority, description:taskDescription, notes:taskNotes},
        function(data){
            if(data!=null){
                alert("Your Task has been added successfully")
            }
        }
    )
    })

})