var db=require('../database/dbconnection'); //reference of dbconnection.js
var Magasin={
    insertMagasin:function(Magasin,callback){
        return db.query("insert into magasin (id_magasin,adresse_magasin,tel1_magasin,tel2_magasin,fax1_magasin,fax2_magasin,email_magasin,position_map_magasin)values(?,?,?,?,?,?,?,?);",[Magasin.id_magasin,Magasin.adresse_magasin,Magasin.tel1_magasin,Magasin.tel2_magasin,Magasin.fax1_magasin,Magasin.fax2_magasin,Magasin.email_magasin,Magasin.position_map_magasin],callback);
    },
    getMagasin:function(callback){
        return db.query("select * from magasin",callback);
    },
    getMagasinById:function (id,callback) {
        return db.query("select * from magasin where id_magasin =?",[id],callback);
    },
    updateMagasin:function(id,Magasin,callback){
        return db.query("update magasin set adresse_magasin=?,tel1_magasin=?,tel2_magasin=?,fax1_magasin=?,fax2_magasin=?,email_magasin=?,position_map_magasin=? where id_magasin=?",[Magasin.adresse_magasin,Magasin.tel1_magasin,Magasin.tel2_magasin,Magasin.fax1_magasin,Magasin.fax2_magasin,Magasin.email_magasin,Magasin.position_map_magasin,id],callback);
    },
    deleteMagasin:function (id,callback) {
        return db.query("delete from magasin where id_magasin=?",[id],callback);
    },
    getMagasinByIdAdmin:function(id,callback){
        return db.query("select * from magasin where id_user=?",[id],callback);
    }
}
module.exports=Magasin;