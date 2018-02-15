var db=require('../database/dbconnection'); //reference of dbconnection.js
var Admin={
    insertAdmin:function(Admin,callback){
            return db.query("insert into admin (id_admin,nom_admin,prenom_admin,tel1_admin,tel2_admin,fax1_admin,fax2_admin,email_admin,adresse_admin,code_postal_admin,id_agence,passwordd)values(null,?,?,?,?,?,?,?,?,?,?,?);",[Admin.nom_admin,Admin.prenom_admin,Admin.tel1_admin,Admin.tel2_admin,Admin.fax1_admin,Admin.fax2_admin,Admin.email_admin,Admin.adresse_admin,Admin.code_postal_admin,Admin.id_agence,Admin.passwordd],callback);
    },
    getAdmin:function(callback){
         console.log("response get Admin ----------------------");
            return db.query("select * from admin",callback);
    },
    getAdminById:function (id,callback) {
            return db.query("select * from admin where id_admin =?",[id],callback);
    },
    updateAdmin:function(id,Admin,callback){
            return db.query("update admin set nom_admin=?,prenom_admin=?,tel1_admin=?,tel2_admin=?,fax1_admin=?,fax2_admin=?,email_admin=?,adresse_admin=?,code_postal_admin=? where id_admin=?",[Admin.nom_admin,Admin.prenom_admin,Admin.tel1_admin,Admin.tel2_admin,Admin.fax1_admin,Admin.fax2_admin,Admin.email_admin,Admin.adresse_admin,Admin.code_postal_admin,Admin.passwordd,id],callback);
    },
    deleteAdmin:function (id,callback) {
            return db.query("delete from admin where id_admin=?",[id],callback);
    },
    connectAdmin:function(Admin,callback){
         console.log("response debut ----------------------"+JSON.stringify(Admin));
        return db.query("select * from admin where username=? and passwordd=? ",[Admin.username,Admin.password],callback);;
    },
}
module.exports=Admin;