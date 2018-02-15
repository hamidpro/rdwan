
var express=require('express');
var router=express.Router();
var Article=require('../models/Article');


//insert new agence /api/agence
router.post("/",function(req,res,next){
    Article.insertArticle(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/:id?",function(req,res,next){
    if(req.params.id){
        Article.getArticleById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });  
    }
    else{
           Article.getAllArticle(function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        }); 

    }
});


router.get("/notininventory/:id?",function(req,res,next){
    if(req.params.id){
        Article.getArticleNotInInventory(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }
    
});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/all/:id?",function(req,res,next){
    if(req.params.id){
        Article.getArticles(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }
    
});

//get the rows of agence /api/agence ou /api/agence/1
router.get("/ref/:ref?",function(req,res,next){
    if(req.params.ref){
        Article.getArticleByRef(req.params.ref,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }
    
});


//get the rows of agence /api/agence ou /api/agence/1
router.get("/last/last",function(req,res,next){
        Article.getLastArticle(function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        }); 
});


//insert new agence /api/agence
router.post("/search",function(req,res,next){
    console.log(req.body);
       
        if(req.body.name=="categorie_article"){
            Article.getArticlesByCategory(req.body,function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }
        else if(req.body.name=="famille_article"){
            Article.getArticlesByFamille(req.body,function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }
        else if(req.body.name=="type_article"){
            Article.getArticlesByType(req.body,function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }
        else if(req.body.name=="marque_article"){
            Article.getArticlesByMarque(req.body,function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }

         else if(req.body.name=="endroit_article"){
            Article.getArticlesByEndroit(req.body,function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }


         else if(req.body.name=="etat_article"){
            Article.getArticlesByEtat(req.body,function(err,rows){
                if(err){ res.json(err);}
                else{    res.json(rows);}
            });
        }
});



//update agence /api/agence/1
router.put("/:id",function(req,res,next){
    Article.updateArticle(req.params.id,req.body,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});

router.put("/status/:id/:status",function(req,res,next){
    Article.changeStatus(req.params.id,req.params.status,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});



//delete agence /api/agence/1
router.delete("/:id",function (req,res,next) {
    Article.deleteArticle(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

module.exports=router;