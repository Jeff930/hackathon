const express = require('express')
var mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'seafarerdb'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user-signup', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `crew_members` (`crew_member_id`,`crew_first_name`, `crew_last_name`, `crew_id`,`rating_id`, `email`,`password`,`employment_date`,`account_created`) " +
      "VALUES (NULL, '" + form.firstname + "','" + form.lastname + "','"+ 1 + "','"+ 1 + "','"+ form.email + "','" + form.password + "', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP)";
  con.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log(result);
          res.send(result);
      }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})