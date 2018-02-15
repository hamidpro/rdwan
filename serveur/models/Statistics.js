var db=require('../database/dbconnection'); //reference of dbconnection.js
var Statistics={

    getTotalArticle:function(callback){
        return db.query("Select count(*) as total from articles",callback);
    },
      getTotalArticleByCategory:function(callback){
        return db.query("Select categorie_article as name,count(*) as total from articles group by categorie_article ",callback);
    },
    getTotalArticleByType:function(callback){
        return db.query("Select type_article as name,count(*) as total from articles group by type_article ",callback);
    },
    getTotalArticleByFamille:function(callback){
        return db.query("Select famille_article as name,count(*) as total from articles group by famille_article ",callback);
    },
    getTotalArticleByMarque:function(callback){
        return db.query("Select marque_article as name,count(*) as total from articles group by marque_article ",callback);
    },
     getTotalArticleByEtat:function(callback){
        return db.query("Select etat_article as name,count(*) as total from articles group by etat_article ",callback);
    },
     getTotalArticleByAndroit:function(callback){
        return db.query("Select endroit_article as name,count(*) as total from articles group by endroit_article ",callback);
    }

}
module.exports=Statistics;