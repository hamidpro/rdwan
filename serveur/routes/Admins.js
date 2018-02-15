
var express=require('express');
var router=express.Router();
var Admin=require('../models/Admin');

//get the rows of agence /api/agence ou /api/agence/1
router.get("/:id?",function(req,res,next){
    if(req.params.id){
        Admin.getAdminById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });
    }else{
         console.log("router  get Admin ----------------------");
        Admin.getAdmin(function(err,rows){
            if(err){ res.json(err);}
            else{    res.json(rows);}
        });
    }
});
//insert new agence /api/agence
router.post("/",function(req,res,next){
    Admin.insertAdmin(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//update agence /api/agence/1
router.put("/:id",function(req,res,next){
    Admin.updateAdmin(req.params.id,req.body,function(err,rows){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

//delete agence /api/agence/1
router.delete("/:id",function (req,res,next) {
    Admin.deleteAdmin(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});


//authentification user 
router.post("/auth",function(req,res,next){
    Admin.connectAdmin(req.body,function(err,rows){
        console.log("serveur router.post");
        console.log("body =>"+JSON.stringify(req.body));
        if(err){ res.json(err);}
        else{    res.json(rows);}
    });
});




module.exports=router;