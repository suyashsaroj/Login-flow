const express = require('express')
const path = require('path')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);//embeded js
app.use(express.static(path.join(__dirname, 'client')));

app.get('/login', (req, res) => {
  var name = 'devraj pandey';
  res.render(__dirname + "/client/login-signup.html", {name:name});
});

app.post('/welcome', (req, res) => {
  var num = req.body;
  res.render(__dirname + "/client/welcome.html", {num:parseInt(num.mobile)});
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/login-signup.html'));
});


app.listen(port, () => {
  console.log(`web app listening on http://localhost:${port}`)
})