var express = require("express");
var db = require("./../models");
var router = express.Router();

router.get("/", function(req, res){
    db.User.findAll({
        include: [db.Task]
    }).then(function(data){
        res.json(data);
    });
});

router.post("/", function(req, res){
    db.User.create(req.body).then(function(data){
        res.json(data);
    });
});

router.get("/:id", function(req, res){
    db.User.findOne({
        include: [db.Task],
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
});

module.exports = router;