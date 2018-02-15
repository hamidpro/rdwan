var db=require('../database/dbconnection'); //reference of dbconnection.js
var Parametre={
    insertParametre:function(Parametre,callback){
        return db.query("insert into parametres values (?,?,?,1)",[Parametre.id_parametre,Parametre.key_name,Parametre.value],callback);
    },
    getParametre:function(callback){
        return db.query("Select * from parametres",callback);
    },
    getParametreById:function (id,callback) {
        return db.query("select * from parametres where id_parametre =?",[id],callback);
    },
    updateParametre:function(id,Parametre,callback){
        return db.query("update parametres set value=? where id_parametre=?",[Parametre.value,id],callback);
    },
    deleteParametre:function (id,callback) {
        return db.query("delete from parametres where id_parametre=?",[id],callback);
    }
}
module.exports=Parametre;