
var express=require('express');
var router=express.Router();
var User=require('../models/User');

//get the rows of user /api/user ou /api/user/1
router.get("/:id?",function(req,res,next){
    if(req.params.id){
        User.getUserById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }else{
        User.getUser(function(err,rows){
            if(err){ res.json(err);}
            else{    res.json(rows);}
        });
    }
});
//insert new user /api/user
router.post("/",function(req,res,next){
    User.insertUser(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//authentification user 
router.post("/auth",function(req,res,next){
    User.connectUser(req.body,function(err,rows){
        console.log("serveur router.post");


        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});


router.put("/:id",function(req,res,next){
    User.updateUser(req.params.id,req.body,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});


router.delete("/:id",function (req,res,next) {
    User.deleteUser(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

module.exports=router;