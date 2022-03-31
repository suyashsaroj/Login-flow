var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'food'
  })

  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
   })

   connection.query('CREATE TABLE IF NOT EXISTS food(id int primary key auto_increment, mobile int UNIQUE KEY, name varchar(255) )', function(err, result) {
    if (err) throw err 
  })

   module.exports=connection