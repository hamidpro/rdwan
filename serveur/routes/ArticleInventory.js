
var express=require('express');
var router=express.Router();
var ArticleInventory=require('../models/Article_inventory');



router.get("/:id?",function(req,res,next){
    if(req.params.id){
        ArticleInventory.getArticleInventoryById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });  
    }
    else{
           ArticleInventory.getAllArticleInventory(function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        }); 

    }
});

router.get("/inventory/:id?",function(req,res,next){
    if(req.params.id){
        ArticleInventory.getArticleInventoryById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }
    
});

router.get("/search/ref/:ref?",function(req,res,next){
    if(req.params.ref){
        ArticleInventory.getArticleByRef(req.params.ref,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }
    
});


router.post("/search",function(req,res,next){

    ArticleInventory.searchArticleInventory(req.body,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});

router.post("/",function(req,res,next){
    ArticleInventory.insertArticleInventory(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//update agence /api/agence/1
router.put("/:id",function(req,res,next){
    ArticleInventory.updateArticleInventory(req.params.id,req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//delete agence /api/agence/1
router.delete("/:idArticle/:idInventory",function (req,res,next) {
    ArticleInventory.deleteArticleInventory(req.params.idArticle,req.params.idInventory,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

module.exports=router;