var db=require('../database/dbconnection'); //reference of dbconnection.js
var Inventory={
    insertInventory:function(Inventory,callback){
        return db.query("insert into inventory values (?,?,?,?,1,0)",[Inventory.id_inventory,Inventory.start_date,Inventory.end_date,Inventory.location],callback);
    },
    getInventory:function(callback){
        return db.query("Select * from inventory",callback);
    },
    getInventoryById:function (id,callback) {
        return db.query("select * from inventory where id_inventory=?",[id],callback);
    },
    updateInventory:function(id,Inventory,callback){
        console.log(Inventory);
        return db.query("update inventory set start_date=?,location=? where  id_inventory=?",[Inventory.start_date,Inventory.location,id],callback);
    },
    deleteInventory:function (id,callback) {
        return db.query("delete from inventory where id_inventory=?",[id],callback);
    },
    colturer:function (id,status,callback) {
        return db.query("update inventory set status=? where id_inventory=?",[status,id],callback);
    }
}
module.exports=Inventory;