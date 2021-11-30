var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shivani:123@cluster0.clb6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "DB Connection Failed.."));
db.once('open', function(callback){
    console.log("DB Connection Created..");
})

var app=express() 
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/register', function(request,response){
    var name = request.body.name;
    var email = request.body.email;
    var pass = request.body.password;
    var phone = request.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return response.redirect('signed_up.html');
});

app.post('/check_login', function (request,response){
    var email = request.body.email;
    var pass = request.body.password;

    

    db.collection('details').findOne({"email":email}, function(err, result) {
        if (err) {throw err;}
        else if(result==null){ 
            return response.redirect('login.html');
        }
        else if(result.email==email && result.password==pass ){
            response.redirect('logged_in.html');
        }

        else{ 
            return response.redirect('login.html');
        }
    });

});


app.get('/find', function (request, response){

   var doc=  db.collection("products").find();
   if(doc)
   { 
       return response.redirect('found.html');
   }
   else return response.redirect("home.html");
 })

app.get('/home', function (request, response){
    return response.redirect('home.html');

});
  
app.get('/login', function (request, response){
    return response.redirect('login.html');

  });


app.get('/', function (request, response){
    response.set({
    'Access-control-Allow-Origin': '*'
    });
    return response.redirect('index.html');
}).listen(1710)
  
  
console.log("Listening at port 1710");