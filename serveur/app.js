var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var methodOverride = require('method-override');
var multer = require('multer');
var fs = require('fs');

var formidable = require('formidable'); 
var http = require('http');

//------------  my  Router include --------------------------
var Magasin=require('./routes/Magasin');
var Admins=require('./routes/Admins');
var Inventory=require('./routes/Inventory');
var Users=require('./routes/Users');
var Article=require('./routes/Articles');
var index=require('./routes/index');
var Parametres=require('./routes/Parametres');
var Statistics=require('./routes/Statistics');
var InventoryStatistics=require('./routes/InventoryStatistics');
var ArticleInventory=require('./routes/ArticleInventory');
//------------ end  my   Router include --------------------------
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());


//change this false -> TRUE
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//---------------------------- use Router --------------------------
app.use('/api/magasin',Magasin);
app.use('/api/admins',Admins);
app.use('/api/articles',Article);
app.use('/api/inventory',Inventory);
app.use('/api/users',Users);
app.use('/',index);

app.use('/api/parametres',Parametres);
app.use('/api/statistics',Statistics);
app.use('/api/statistics/inventory',InventoryStatistics);
app.use('/api/articlesinventory',ArticleInventory);


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploadsMulter')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

app.post("/api/upload/image",function(req,res,next){
      console.log("\n---------------hello ---------------\n")
      console.log(req.body);
      console.log("\n------------------------------\n")

     res.sendFile(path.resolve(req.body.path));
});



app.post('/api/upload', function(req, res) {
    // console.log("0-------------- /api/upload");
    var form = new formidable.IncomingForm();
     form.encoding = 'binary';

   


   // console.log("1-------------- /api/upload");


    form.parse(req, function(err, fields, files) {
        if(err){
           //  console.log("error");
            console.log(err);  
        }
     
          //console.log("fields");
         //  console.log(fields);
            // console.log("files");
              //   console.log(files);
        // `file` is the name of the <input> field of type `file`
        if(files!=undefined && files!=null &&files.file!=undefined && files.file!=null){
   var old_path = files.file.path,
            file_size = files.file.size,
            file_ext = files.file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(__dirname, '/uploads/', file_name + '.' + file_ext);
         console.log("3-------------- /api/upload");
        fs.readFile(old_path, function(err, data) {
            //console.log("read file >"+old_path);
            fs.writeFile(new_path, data, function(err) {
                // console.log("write  file >"+new_path+"  ");
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        res.status(200);
                        res.json({'success': true,'path':new_path});
                    }
                });
            });
        });
        }else{
            console.log('file is undefined');
        }

     
    });
});














//change this security
/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
*/

//---------------------------- end  use Router --------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}




// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});






 



module.exports = app;