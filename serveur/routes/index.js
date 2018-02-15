/**
 * Created by hp on 5/31/17.
 */


var express=require('express');
var router=express.Router();


//get the rows of agence /api/agence ou /api/agence/1
router.get("/",function(req,res,next){
    res.render('index', {
        title: "Login", //page title
        action: "/api/locations/1", //post action for the form
        fields: [
            {name:'date_debut_location',type:'text',property:''},   //first field for the form
            {name:'date_fin_location',type:'text',property:''},//another field for the form
            {name:'valider_location',type:'text',property:''},//another field for the form
            {name:'id_user',type:'text',property:''},   //first field for the form
            {name:'id_voiture',type:'text',property:''},   //first field for the form
                    ]
    });
});

module.exports=router;