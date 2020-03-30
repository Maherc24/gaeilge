var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017'  ;

module.exports = (function(app){

  app.get('/', function(req,res){
    res.render('home');
  });

  app.get('/register',function(req,res){
    res.render('register');
  });
  app.get('/notes',function(req,res){
    res.render('notes');
  });
  app.get('/contact',function(req,res){
    res.render('contact');
  });
  app.get('/login',function(req,res){
    res.render('login');
  });
  app.get('/loginpage',function(req,res){
    res.render('loginpage');
  });
  app.get('/registerpage',function(req,res){
    res.render('registerpage');
  });
// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    var db = client.db('mydb');
   db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
            res.render('completeprofile',{profileData:user});

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 });
});

//register to DB================================================================
app.post('/registerToDb',urlencodedParser,function(req,res){
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);

     res.render('profile',{loginData:req.body});

  });
//register profile to MongoDB================================================================
  app.post('/completeprofile',urlencodedParser,function(req,res){
   var obj = JSON.stringify(req.body);
   console.log("Final reg Data : "+obj);
   var jsonObj = JSON.parse(obj);
  
   MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
     var db = client.db('mydb');
     db.collection("userprofile").insertOne(jsonObj, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     client.close();
      });
       res.render('completeprofile',{profileData:req.body});
      });
    });
});