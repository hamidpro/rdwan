var db=require('../database/dbconnection'); //reference of dbconnection.js
var Article={
    insertArticle:function(article,callback){
        return db.query("insert into  articles values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?);",[article.id_article,article.reference_article,article.ville_article,article.prix_ht_acquisition_article,article.marque_article,article.prix_ttc_acquisition_article,article.libelle_article,article.Date_entree_article,article.date_de_sortie_article,article.fabriquant_article,article.prix_ht_sortie_article,article.fournisseur_article,article.prix_ttc_sortie_article,article.client_article,article.categorie_article,article.description_article,article.type_article,article.famille_article,article.id_magasin,article.endroit_article,article.etat_article,article.position],callback);
    },
    getAllArticle:function(callback){
        return db.query("select * from articles",[],callback);
    },
    getArticlesByCategory:function(Category,callback){
      return db.query("select * from articles where categorie_article=?",[Category.value],callback);
    },
    getArticlesByFamille:function(Category,callback){
        return db.query("select * from articles where famille_article=?",[Category.value],callback);
      },
    getArticlesByMarque:function(Category,callback){
        return db.query("select * from articles where marque_article=?",[Category.value],callback);
      },
    getArticlesByType:function(Category,callback){
        return db.query("select * from articles where type_article=?",[Category.value],callback);
      },


       getArticlesByEndroit:function(Category,callback){
        return db.query("select * from articles where endroit_article=?",[Category.value],callback);
      },


       getArticlesByEtat:function(Category,callback){
        return db.query("select * from articles where etat_article=?",[Category.value],callback);
      },


    getLastArticle:function(callback){
        return db.query("select * from articles ORDER BY id_article DESC LIMIT 1",callback);
    },
    getArticleNotInInventory:function(idInventory,callback){
        return db.query("select * from articles where id_article not in (select id_article from  article_inventory where id_inventory=?)",[idInventory],callback);
    },
    getArticleByRef:function(ref,callback){
        console.log("nombre ->"+ref);
        return db.query("select * from articles where reference_article=?",[ref],callback);
    },
     searchArticle:function(article,callback){
        console.log("call search ->"+Article.reference_article);
        return db.query("select * from articles where reference_article=? and ville_article=? and prix_ht_acquisition_article=? and marque_article=? and prix_ttc_acquisition_article=? and libelle_article=? and Date_entree_article=? and date_de_sortie_article=? and fabriquant_article=? and prix_ht_sortie_article=? and fournisseur_article=? and prix_ttc_sortie_article=? and client_article=? and categorie_article=? and description_article=? and type_article=? and famille_article=? and id_magasin=? where id_article=?",[article.id_article,article.reference_article,article.ville_article,article.prix_ht_acquisition_article,article.marque_article,article.prix_ttc_acquisition_article,article.libelle_article,article.Date_entree_article,article.date_de_sortie_article,article.fabriquant_article,article.prix_ht_sortie_article,article.fournisseur_article,article.prix_ttc_sortie_article,article.client_article,article.categorie_article,article.description_article,article.type_article,article.famille_article,article.id_magasin,id],callback);
    },
    getArticleById:function (id,callback) {
        return db.query("select * from articles where id_article =?",[id],callback);
    },
    updateArticle:function(id,article,callback){
        return db.query("update articles set ville_article=?,prix_ht_acquisition_article=?,marque_article=?,prix_ttc_acquisition_article=?,libelle_article=?,Date_entree_article=?,date_de_sortie_article=?,fabriquant_article=?,prix_ht_sortie_article=?,fournisseur_article=?,prix_ttc_sortie_article=?,client_article=?,categorie_article=?,description_article=?,type_article=?,famille_article=?,id_magasin=?,endroit_article=?,etat_article=? where id_article=?",[article.ville_article,article.prix_ht_acquisition_article,article.marque_article,article.prix_ttc_acquisition_article,article.libelle_article,article.Date_entree_article,article.date_de_sortie_article,article.fabriquant_article,article.prix_ht_sortie_article,article.fournisseur_article,article.prix_ttc_sortie_article,article.client_article,article.categorie_article,article.description_article,article.type_article,article.famille_article,article.id_magasin,id,article.endroit_article,article.etat_article],callback);
    },
    deleteArticle:function (id,callback) {
        return db.query("delete from articles where id_article=?",[id],callback);
    },
    changeStatus:function (id,status,callback) {
        return db.query("update articles set status=? where id_article=?",[status,id],callback);
    }
}
module.exports=Article;
