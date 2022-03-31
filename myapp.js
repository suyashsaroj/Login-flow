const express = require('express')
const path = require('path')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var connection= require('./db')
const { TIMEOUT } = require('dns')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);//embeded js
app.use(express.static(path.join(__dirname, 'client')));

app.post('/auth', (req, res) => {
  var mobile = req.body.mobile
  var sql ="SELECT mobile FROM food WHERE mobile = (?)"; 
  connection.query(sql, [mobile],function (err, result) {
    if (result.length==0) {
        console.log('err:',err);
       
        res.redirect('/error') 
       
      }else{
        console.log("login successful",result);
        
        res.render(__dirname + "/client/welcome.html", {num:mobile});
       
      }
    });
  
});


app.get('/login', (req, res) => {
  var mobile = req.body.mobile
  res.render(__dirname + "/client/login-signup.html", {num:mobile});
 
});

app.post('/welcome', (req, res) => {
 var num=req.body.mobile
  res.render(__dirname + "/client/welcome.html", {num : parseInt(num) });
});

app.post('/default', (req, res) => {
  
  var mobile = req.body.mobile;
  var name = req.body.name;
    var sql = "INSERT INTO food (mobile,name) VALUES (?,?)";
    connection.query(sql, [mobile,name],function (err, result) {
      if (err) {
        console.log('err:',err);

       
          res.redirect('/error') 
          
      }else{
        console.log("1 record inserted");
        
        
        res.render(__dirname + "/client/default.html");
      }
    });
});

app.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/error.html'));
 });

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signin.html'));
})


app.listen(port, () => {
  console.log(`web app listening on http://localhost:${port}`)
})
