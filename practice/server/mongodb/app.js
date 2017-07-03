var express = require('express'); 
var Mailgun= require('mailgun-js'); 
var bodyParser = require('body-parser'); 
var app = express(); 
var mongoose = require('mongoose');  
mongoose.connect('mongodb://localhost/Ram'); 
var reg=mongoose.model('conts',{address:String,name:String});

var api_key='key-f7f1261f33b3499186b6712a9dce97cc';
var domain='sandbox6e50505638904bf59e5fb5a26b838271.mailgun.org';
var from_who='ramachandranks255@gmail.com';

app.use(bodyParser.json());

app.all('*',function(req,res,next)
{
  console.log("connect mongodb database"); 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/', function(req, res)
{
  reg.find({},function(err,rows)
  {
      console.log("transmit data to front page")
        res.send(rows);
        console.log(rows);
  });
      
});

//contact information

var reg1=mongoose.model('mongocontact',
  {
    Firstname:String,
    lastName:String,
    mobilenumber:String,
    message:String
  })

//contact details
app.post('/contact',function(req,res){
  
    var details = new reg1(req.body);
    //console.log("api_key ",api_key);
    var mailgun = new Mailgun({apiKey:api_key,domain:domain});
    var data={
      from:req.body.Firstname,
      to:from_who,
      subject:req.body.mobile,
      html:req.body.message
    }

    //console.log(mailgun);
    mailgun.messages().send(data,function(error,body){

    if(!error){
      res.send("inserted successfully data");
    } else{
      console.log('err is establish connection',error);
    }
  });
     
});


//logindata
var log=mongoose.model('mongologin',
{
  Emailaddress:String,
  password:String
});
app.post('/logindata',function(req,res)
{
  console.log(req.body);
  log.find({Emailaddress:req.body.Emailaddress,password:req.body.password},function(err,data)
  {
     console.log();
      if(err)
      {
        throw err;

      }else{

        if(data.length>0){
          res.send("success");
        }else{
          res.send("username not found");
        }

      }

      console.log(data)
      }); 
  })

app.listen(8080);