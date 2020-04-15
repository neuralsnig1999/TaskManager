// $(document).ready(function(){
    $(function(){
        const addTaskButton = $("input[type='button']")
       
        addTaskButton.click(function(){

        let task = $("input[id='task']").val()
        let taskDueDate = $("input[id='due']").val()    
        let taskStatus = $("input[name='task-status']:checked").val()
        let taskPriority = $("input[name='priority']:checked").val()
        let taskDescription = $("input[id='desc']").val()
        

        $.post(
            "/tasks",
            {task: task, due: taskDueDate, status: taskStatus, priority:taskPriority, description: taskDescription},
            function(data){
                console.log( data );
            }
        )
        })
    })
// })