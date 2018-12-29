var express = require("express");
var db = require("./../models");
var router = express.Router();

router.get("/", function(req, res){
    db.Task.findAll({}).then(function(data){
        res.json(data);
    });
});

router.post("/", function(req, res){
    db.Task.create(req.body).then(function(data){
        res.json(data);
    });
});

router.get("/:id", function(req, res){
    db.Task.findOne({
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

router.put("/:id", function(req, res){
    db.Task.update({
        complete: req.body.complete   
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(data){
        res.json(data);
    });
});

module.exports = router;