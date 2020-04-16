var uniqueid;
    async function todosLoader() {

        let sort = document.getElementById('sortBy').value

        const resp = await fetch('/tasks/'+ sort, { method: 'GET' })
        const tasks = await resp.json()
        // console.log(tasks)
        let temp = []

        for (const element in tasks) {

            task = {
                id: tasks[element].id,
                title: tasks[element].task,
                sub: [{
                    title: 'description: ' + tasks[element].description,
                    sub: null
                }, {
                    title: 'status: ' + tasks[element].status,
                    sub: null

                }, {
                    title: 'duedate: ' + tasks[element].due,
                    sub: null

                }, {
                    title: 'priority: ' + tasks[element].priority,
                    sub: null

                }, {
                    title: 'notes: ' + tasks[element].notes,
                    sub: null
                }]
            }
            temp.push(task)
        }
        // console.log(task.sub)
        

        var JSON = { menu: temp }
        console.log(temp)


        $(function () {
            var ul = document.getElementById('myList')
            ul.innerHTML = ''

            function parseMenu(ul, menu) {
                for (var i = 0; i < menu.length; i++) {
                    var li = $(ul).append(
                        '<br /><li class=' + (menu[i].sub ? 'multi' : 'simple') + '>' + menu[i].title
                        + '</li>');

                    if (menu[i].sub != null) {
                        // console.log("submenu")
                        // console.log(menu[i].sub)
                        let idforli = menu[i].id
                        var subul = $('<ul class="list"></ul>');
                        $(li).append(subul);

                        var updateButton = $("<input type='button' value='update' class='btn btn-danger update' id = '" + idforli + "' data-toggle='modal' data-target='#signup' style='margin-left:24px;'><br/><br />")
                        $(li).append(updateButton);

                        parseMenu($(subul), menu[i].sub);
                    }
                    $(subul).append('<input type="text" placeholder="add notes">')
                    $(subul).append('<input type="submit" value="Add" id="add-notes" style="margin:10px;">')
                }
                
            }

            var menu = $('#myList');
            parseMenu(menu, JSON.menu);
        });
    };//]]>​

$(document).on('click', '#myList > li ', function () {
    $(this).next('ul').toggle(200);
    if (($(this).next('ul').length)) {
        $(this).toggleClass('multi-opened');
    }
})

$(document).on('click', '.update', function () {

    uniqueid = $(this).attr("id")
    console.log(uniqueid)

});

$(document).on('click', '#editDetails', async function () {
    // console.log(uniqueid)
    let update_duedate = $("#update_duedate").val()
    // console.log(update_duedate)
    let update_priority = $("#update_priority").val()
    
    let update_statusComplete = $('#update_complete').is(":checked")
    let update_status = update_statusComplete ? "complete" : "incomplete"

    // const resp = await fetch('/tasks/' + uniqueid, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    
    //     body: JSON.stringify({ update_duedate, update_priority, update_status })
    // })

    $.patch(
        '/tasks/' + uniqueid,
        { update_duedate, update_priority, update_status },
        function(data){
            console.log(data)
        }
    )
})