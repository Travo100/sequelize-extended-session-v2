$(document).ready(function(){
    var userId = window.location.pathname.split("/").pop();
    function getUserAndTasks() {
        $.ajax({
            method: "GET",
            url: `/api/users/${userId}`
        }).then(function(userData){
            console.log(userData);
            $("#user-email").text(userData.email);
    
            $("tbody").empty();
            for(var i = 0; i < userData.Tasks.length; i++) {
                var tr = $("<tr>");
                tr.append(`<td>${userData.Tasks[i].id}</td><td>${userData.Tasks[i].task}</td><td>${userData.Tasks[i].complete}</td><td><button class='task-complete' data-task-id=${userData.Tasks[i].id}>Complete Task</button></td>`);
                $("tbody").append(tr);
            }
        }).catch(function(err){
            console.log(err);
        });
    }

    getUserAndTasks();
    

    $("#task-form").on("submit", function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/tasks",
            data: {
                task: $("#user-task").val().trim(),
                complete: false,
                UserId: userId
            }
        }).then(function(data){
            if(data){
                getUserAndTasks();
            }
        });
    });

    $(document).on("click", ".task-complete", function(e){
        e.preventDefault();
        var taskId = $(this).attr("data-task-id");
        $.ajax({
            method: "PUT",
            url: `/api/tasks/${taskId}`,
            data: {
                complete: true
            }
        }).then(function(data){
            if(data) {
                getUserAndTasks();
            }
        });
    });

});