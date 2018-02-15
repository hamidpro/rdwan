
var express=require('express');
var router=express.Router();
var Statistics=require('../models/Statistics');

//get the rows of agence /api/agence ou /api/agence/1
router.get("/all",function(req,res,next){
        Statistics.getTotalArticle(function(err,rows){
            if(err){ res.json(err);}
            else{    res.json(rows);}
        });
    
});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/category",function(req,res,next){
    Statistics.getTotalArticleByCategory(function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/famille",function(req,res,next){
    Statistics.getTotalArticleByFamille(function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/marque",function(req,res,next){
    Statistics.getTotalArticleByMarque(function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});




//get the rows of agence /api/agence ou /api/agence/1
router.get("/type",function(req,res,next){
    Statistics.getTotalArticleByType(function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/etat",function(req,res,next){
    Statistics.getTotalArticleByEtat(function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});




//get the rows of agence /api/agence ou /api/agence/1
router.get("/androit",function(req,res,next){
    Statistics.getTotalArticleByAndroit(function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });

});



module.exports=router;