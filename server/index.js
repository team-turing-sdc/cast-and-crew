const newrelic = require('newrelic');
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const db = require("../database/queries.js");
const port = process.env.PORT || 80;
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//for default page endpoint:
app.get("/actors", (req, res) => {
  //creates a range for the sample of actors:
  //any number from 1 to 10,000,000 - 10;
  let id1 = Math.floor(Math.random() * Math.floor(9999990));
  //random range from 3 to 10:
  let length = Math.floor(Math.random() * Math.floor(8)) + 3;
  let id2 = id1 + length;
  db.getActorById(id1, id2, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    res.send(JSON.stringify(data.rows));
  });
});

//for endpoint with id's:
app.get("/actors/:id", (req, res) => {
  let id1 = Math.floor(Math.random() * Math.floor(9999990));
  let length = Math.floor(Math.random() * Math.floor(8)) + 3;
  let id2 = id1 + length;
  db.getActorById(id1, id2, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    res.send(JSON.stringify(data.rows));
  });
});

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/actors", (req, res) => {
  let { name, role, photo, bio, filmography } = req.body;
  console.log(name);
  db.createActor(name, role, photo, bio, filmography, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    res.send(data);
  });
});

app.put("/actors/:id", (req, res) => {
  let id = req.params.id;
  let { name, title } = request.body;

  db.updateActor(name, id, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    res.send(data);
  });
});

app.delete("/actors/:id", (req, res) => {
  let id = req.params.id;

  db.deleteActor(id, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
