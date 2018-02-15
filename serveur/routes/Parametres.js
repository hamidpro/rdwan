
var express=require('express');
var router=express.Router();
var Parametre=require('../models/Parametre');

//get the rows of agence /api/agence ou /api/agence/1
router.get("/:id?",function(req,res,next){
    if(req.params.id){
        Parametre.getParametreById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }else{
        Parametre.getParametre(function(err,rows){
            if(err){ res.json(err);}
            else{    res.json(rows);}
        });
    }
});
//insert new agence /api/agence
router.post("/",function(req,res,next){
    Parametre.insertParametre(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//authentification user 
router.post("/auth",function(req,res,next){
    Parametre.connectParametre(req.body,function(err,rows){
        console.log("serveur router.post");


        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});




//update agence /api/agence/1
router.put("/:id",function(req,res,next){
    Parametre.updateParametre(req.params.id,req.body,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});

//delete agence /api/agence/1
router.delete("/:id",function (req,res,next) {
    Parametre.deleteParametre(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

module.exports=router;