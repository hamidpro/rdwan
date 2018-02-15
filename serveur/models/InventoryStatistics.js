var db=require('../database/dbconnection'); //reference of dbconnection.js
var InventoryStatistics={

    getTotalArticle:function(id,callback){
        return db.query("Select count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?)",[id],callback);
    },
      getTotalArticleByCategory:function(id,callback){
        return db.query("Select categorie_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by categorie_article ",[id],callback);
    },
    getTotalArticleByType:function(id,callback){
        return db.query("Select type_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?)  group by type_article",[id],callback);
    },
    getTotalArticleByFamille:function(id,callback){
        return db.query("Select famille_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by famille_article ",[id],callback);
    },
    getTotalArticleByMarque:function(id,callback){
        return db.query("Select marque_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by marque_article ",[id],callback);
    },
    getTotalArticleByEtat:function(id,callback){
        return db.query("Select etat_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by etat_article ",[id],callback);
    },
    getTotalArticleByAndroit:function(id,callback){
        return db.query("Select endroit_article as name,count(*) as total from articles where id_article in (select id_article from article_inventory where id_inventory=?) group by endroit_article ",[id],callback);
    }
}
module.exports=InventoryStatistics;