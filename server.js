var express = require("express");
var path = require("path");
var db = require("./models");

var PORT = process.env.PORT || 8080;

var usersRouter = require("./routes/users");
var tasksRouter = require("./routes/tasks");

var app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/task/:id", function(req, res){
    res.sendFile(path.join(__dirname, "public/task.html"));
});

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log(`App is on http://localhost:${PORT}`);
    });
});