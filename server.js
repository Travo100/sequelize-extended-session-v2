var express = require("express");
var path = require("path");
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/users", function(req, res){
    db.User.findAll({}).then(function(data){
        res.json(data);
    });
});

app.get("/api/user/:id", function(req, res){
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(data){
        if(data) {
            return res.json(data);
        } else {
            return res.status(404).json({"status": 404, "message": "User not found"});
        }
    }).catch(function(err){
        res.status(400).json(err);
    });
})

app.post("/api/users", function(req, res){
    db.User.create(req.body).then(function(data){
        res.json(data);
    });
});

db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log(`App is on http://localhost:${PORT}`);
    });
});