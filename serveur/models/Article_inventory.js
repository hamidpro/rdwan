var db=require('../database/dbconnection'); //reference of dbconnection.js
var ArticleInventory={
    insertArticleInventory:function(body,callback){
        return db.query("insert into article_inventory  values(?,?,?,now(),?,?,?);",[body.id_ArticleInventory,body.id_inventory,body.id_article,body.status,body.endroit_article,body.etat_article,body.id_user_inventory],callback);
    },
    getArticleByRef:function(ref,callback){
        console.log(ref);
        return db.query("Select * from articles a,article_inventory v where a.id_article=v.id_article and reference_article=? ",[ref],callback);
    },
    getArticleInventory:function(callback){
        return db.query("Select * from article_inventory",callback);
    },
    getArticleInventoryById:function (id,callback) {
        return db.query("select * from articles where id_article in (select id_article from article_inventory where id_inventory=? )",[id],callback);
    },
    updateArticleInventory:function(id,ArticleInventory,callback){
        return db.query("update article_inventory set id_article=?,id_inventory=? where id_article_inventory=? ",[ArticleInventory.id_article,ArticleInventory.id_inventory,id],callback);
    },
    deleteArticleInventory:function (idArticle,idInventaire,callback) {
        return db.query("delete from article_inventory where id_article=? and id_inventory=?",[idArticle,idInventaire],callback);
    },
    changeStatus:function (idArticle,idInventaire,callback) {
        return db.query("update article_inventory set status=?  where idArticle=? and idInventaire=?",[idArticle,idInventaire],callback);
    }
}
module.exports=ArticleInventory;