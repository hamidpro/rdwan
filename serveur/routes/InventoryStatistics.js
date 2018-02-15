
var express=require('express');
var router=express.Router();
var Statistics=require('../models/InventoryStatistics');

//get the rows of agence /api/agence ou /api/agence/1
router.get("/all/:id",function(req,res,next){
        Statistics.getTotalArticle(req.params.id,function(err,rows){
            if(err){ res.json(err);}
            else{    res.json(rows);}
        });
    
});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/category/:id",function(req,res,next){
    Statistics.getTotalArticleByCategory(req.params.id,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/famille/:id",function(req,res,next){
    Statistics.getTotalArticleByFamille(req.params.id,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/marque/:id",function(req,res,next){
    Statistics.getTotalArticleByMarque(req.params.id,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/type/:id",function(req,res,next){
    Statistics.getTotalArticleByType(req.params.id,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/etat/:id",function(req,res,next){
    Statistics.getTotalArticleByEtat(req.params.id,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});




//get the rows of agence /api/agence ou /api/agence/1
router.get("/androit/:id",function(req,res,next){
    Statistics.getTotalArticleByAndroit(req.params.id,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});

module.exports=router;