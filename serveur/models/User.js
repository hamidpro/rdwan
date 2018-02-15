var db=require('../database/dbconnection'); //reference of dbconnection.js
var User={
    insertUser:function(User,callback){
        return db.query("insert into users values(?,?,?,?,?,?,?,?,?,?,?,?,?);",[User.id_user,User.nom_user,User.prenom_user,User.tel1_user,User.tel2_user,User.email_user,User.ville_user,User.adresse_user,User.code_postal_user,User.username,User.password,User.id_admin,User.role],callback);
    },
    getUser:function(callback){
        return db.query("Select * from users",callback);
    },
    connectUser:function(User,callback){
         console.log("serveur connectUser");
         console.log(User);
        return db.query("Select * from users where username=? and password=? ",[User.username,User.password],callback);
    },
    getUserById:function (id,callback) {
        return db.query("select * from users where id_user =?",[id],callback);
    },
    updateUser:function(id,User,callback){
        console.log(User);
        return db.query("update users set nom_user=?,prenom_user=?,tel1_user=?,tel2_user=?,email_user=?,adresse_user=?,code_postal_user=?,username=?,password=? where id_user=?",[User.nom_user,User.prenom_user,User.tel1_user,User.tel2_user,User.email_user,User.adresse_user,User.code_postal_user,User.username,User.password,id],callback);
    },
    deleteUser:function (id,callback) {
        return db.query("delete from users where id_user=?",[id],callback);
    }
}
module.exports=User;