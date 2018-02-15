
var express=require('express');
var router=express.Router();
var Inventory=require('../models/Inventory');

router.get("/:id?",function(req,res,next){
    if(req.params.id){
        Inventory.getInventoryById(req.params.id,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });  
    }
    else{
 Inventory.getInventory(function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });

    }
});


router.put("/status/:idinventory/:status",function(req,res,next){
    if(req.params.status && req.params.idinventory){
        Inventory.colturer(req.params.idinventory,req.params.status,function(err,rows){
            if(err){ res.json(err) ; }
            else   { res.json(rows); }
        });  
    }

});


router.post("/",function(req,res,next){
    Inventory.insertInventory(req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});


router.put("/:id",function(req,res,next){
    Inventory.updateInventory(req.params.id,req.body,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});


router.delete("/:id",function (req,res,next) {
    Inventory.deleteInventory(req.params.id,function(err,count){
        if(err){ res.json(err);}
        else{    res.json(count);}
    });
});

module.exports=router;