/**
 * this file dbconnextion for connect to database mysql
 */

var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'codebar'
});
module.exports=connection;

