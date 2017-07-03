
var express=require('express');
var mysql=require('mysql');
var bodyparser=require('body-parser');
var app= express();
app.use(bodyparser.json());
var connection= mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "dinga",
    database: "project"
})
connection.connect(function(err){
  if(err){
      console.log(err);
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
})
app.all('*',function(req,res,next){
    console.log("test print to check connection")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


app.get('/', function(req, res){
  connection.query('select * from navbar ', function(err, rows){
      console.log(rows);
      console.log("transmit data to front page")
        res.send(rows);
  });
      
});

app.post('/', function(req, res){
    console.log(req.body);
    var query="insert into contact (firstname,lastname,mobilenumber,message)values('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.mobile+"','"+req.body.message+"')";
    console.log(query);
  connection.query(query, function(err, rows){
      console.log("data recieved in database");
       if(err) throw err;
        res.send('inserted');
         
  });
}); 


app.get('/', function(req, res){
  connection.query('select * from login ', function(err, rows){
      console.log(rows);
      console.log("transmit data to front page")
        res.send(rows);
  });
      
});

app.post('/loginpage',function(req,res)
{
    console.log(req.body);
    var query="select * from login where username='"+req.body.username+"' and password='"+req.body.password+"'";
    connection.query(query,function(err, rows){
      
      console.log(rows);
      if(err){
        throw err;

      }else{

        if(rows.length>0){
          res.send("success");
        }else{
          res.send("username not found");
        }

      }

       console.log("data send to frontpage");
      console.log(rows);
  });
})

app.listen(8080);  
