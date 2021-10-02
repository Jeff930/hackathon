const express = require('express')
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
dotenv.config();
process.env.TOKEN_SECRET;

// Database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'seafarerdb'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Body parser
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json());
app.use('/', express.static(__dirname + 'server/index.html'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

//CREW RECORD APIs
app.post('/new-crew-record', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `crew_records` (`record_id`,`crew_id`,`route_id`,`ship_id`,`departure_date`,`arrived_date`) " +
      "VALUES (NULL, '" + form.crewId + "','" + form.routeId + "','" + form.shipId + "','"+ form.departureDate + "','" + form.arrivedDate + "')";
  connection.query(sql, (err, result) => {
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

app.post('/update-crew-record', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log("Form: ",form);
  var sql = "UPDATE `crew_records` SET" +
      " `crew_id` = '" + form.crewId + "'," +
      " `route_id` = '" + form.routeId + "'," +
      " `ship_id` = '" + form.shipId + "'," +
      " `departure_date` = '" + form.departureDate + "'," +
      " `arrived_date` = '" + form.arrivedDate + "'" +
      "  WHERE `record_id` = '" + form.recordId + "'";

  connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log("Result: ", result);
          res.send(result);
      }
  });
});

app.get('/delete-crew-record/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM `crew_records` WHERE `record_id` = '"+id+"'";
  connection.query(sql, (err, result) => {
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

//CREW MEMBER APIs
app.post('/user-signup', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `crew_members` (`crew_member_id`,`crew_first_name`, `crew_last_name`, `crew_id`,`rating_id`, `email`,`password`,`employment_date`,`account_created`) " +
      "VALUES (NULL, '" + form.firstName + "','" + form.lastName + "','"+ 1 + "','"+ 1 + "','"+ form.email + "','" + form.password + "', CURRENT_TIMESTAMP , CURRENT_TIMESTAMP)";
  connection.query(sql, (err, result) => {
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

app.get('/user-login/:form', (req, res) => {
  const form = JSON.parse(req.params.form);
  console.log(form);
  var sql = "SELECT `crew_member_id`," +
      " `crew_first_name`," +
      " `crew_last_name`," +
      " `account_created`" +
      " FROM `crew_members` WHERE `email` = '" + form.email + "'" +
      " AND `password` = '" + form.password + "'";
  connection.query(sql, (err, result) => {
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

app.get('/user-details/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  var sql = "SELECT `crew_member_id`," +
    " `crew_first_name`," +
    " `crew_last_name`," +
    " `account_created`," +
    " `rating_id`," +
    " `crew_id`," +
    " `crew_last_name`," +
    " `employment_date`" +
      " FROM `crew_members` WHERE `crew_member_id` = '" + userId + "'";
  connection.query(sql, (err, result) => {
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

app.post('/update-user-details', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log("Form: ",form);
  var sql = "UPDATE `crew_members` SET" +
      " `crew_first_name` = '" + form.firstName + "'," +
      " `crew_last_name` = '" + form.lastName + "'," +
      " `rating_id` = '" + form.ratingId + "'," +
      " `crew_id` = '" + form.crewId + "'," +
      " `email` = '" + form.email + "'" +
      "  WHERE `crew_member_id` = '" + form.userId + "'";

  connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log("Result: ", result);
          res.send(result);
      }
  });
});

app.get('/delete-crew-member/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM `crew_members` WHERE `crew_member_id` = '"+id+"'";
  connection.query(sql, (err, result) => {
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

//CREW APIs
app.post('/new-crew', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `crews` (`crew_id`,`crew_name`) " +
      "VALUES (NULL, '" + form.crewName + "')";
  connection.query(sql, (err, result) => {
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

app.post('/update-crew-details', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log("Form: ",form);
  var sql = "UPDATE `crew_members` SET" +
      " `crew_name` = '" + form.crewName + "'" +
      "  WHERE `crew_id` = '" + form.crewId + "'";

  connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log("Result: ", result);
          res.send(result);
      }
  });
});

app.get('/delete-crew/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM `crews` WHERE `crew_id` = '"+id+"'";
  connection.query(sql, (err, result) => {
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

//ROUTES APIs
app.post('/new-route', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `routes` (`route_id`,`origin`,`destination`) " +
      "VALUES (NULL, '" + form.origin+ "', '" + form.destination + "')";
  connection.query(sql, (err, result) => {
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

app.post('/update-route-details', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log("Form: ",form);
  var sql = "UPDATE `routes` SET" +
      " `origin` = '" + form.origin + "'," +
      " `destination` = '" + form.destination + "'" +
      "  WHERE `route_id` = '" + form.routeId + "'";

  connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log("Result: ", result);
          res.send(result);
      }
  });
});

app.get('/delete-route/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM `routes` WHERE `route_id` = '"+id+"'";
  connection.query(sql, (err, result) => {
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

//COMPANY APIs
app.post('/new-company', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `companies` (`company_id`,`company_name`) " +
      "VALUES (NULL, '" + form.companyName+ "')";
  connection.query(sql, (err, result) => {
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

app.post('/update-company-details', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log("Form: ",form);
  var sql = "UPDATE `companies` SET" +
      " `company_name` = '" + form.companyName + "'" +
      "  WHERE `company_id` = '" + form.companyId + "'";

  connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log("Result: ", result);
          res.send(result);
      }
  });
});

app.get('/delete-company/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM `companies` WHERE `company_id` = '"+id+"'";
  connection.query(sql, (err, result) => {
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

//SHIPS APIs
app.post('/new-ship', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log(form);
  var sql = "INSERT INTO `ships` (`ship_id`,`ship_name`, `company_id`) " +
      "VALUES (NULL, '" + form.shipName+ "','"+ form.companyId + "')";
  connection.query(sql, (err, result) => {
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

app.post('/update-ship-details', bodyParser.json(), (req, res) => {
  const form = req.body;
  console.log("Form: ",form);
  var sql = "UPDATE `ships` SET" +
      " `ship_name` = '" + form.shipName + "'" +
      " `company_id` = '" + form.company_id + "'" +
      "  WHERE `ship_id` = '" + form.shipId + "'";

  connection.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ "error": err });
      }
      else {
          console.log("Result: ", result);
          res.send(result);
      }
  });
});

app.get('/delete-ship/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM `ships` WHERE `ship_id` = '"+id+"'";
  connection.query(sql, (err, result) => {
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