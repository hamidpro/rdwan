
var express=require('express');
var router=express.Router();
var Magasin=require('../models/Magasin');

//get the rows of agence /api/agence ou /api/agence/1
router.get("/:id?",function(req,res,next){
        if(req.params.id){
            Magasin.getMagasinById(req.params.id,function(err,rows){
                if(err){ res.json(err) ; }
                else   { res.json(rows); }
            });
        }else{
            Magasin.getMagasin(function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }
});
//insert new agence /api/agence
router.post("/",function(req,res,next){
     Magasin.insertMagasin(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//update agence /api/agence/1
router.put("/:id",function(req,res,next){
    Magasin.updateMagasin(req.params.id,req.body,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});

//delete agence /api/agence/1
router.delete("/:id",function (req,res,next) {
    Magasin.deleteMagasin(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

router.delete("/admin/:id",function (req,res,next) {
    Magasin.getMagasinByIdAdmin(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});



module.exports=router;