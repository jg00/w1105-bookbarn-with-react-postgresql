const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");

const app = express();
const connectionString = "postgresql://localhost:5432/bookbarn";
const db = pgp(connectionString);

const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/books/add", (req, res) => {
  //   console.log(req.body);
  //   res.send("test");
  //   res.send(req.body);

  let title = req.body.title;
  let genre = req.body.genre;

  let sql = "INSERT INTO books (title, genre) values ($1, $2) RETURNING bookid";
  db.one(sql, [title, genre])
    .then(data => {
      res.json({ bookid: data.bookid });
    })
    .catch(error => {
      res.json({ message: "Insert book failed: ", error });
    });
});

app.post("/api/user/register", (req, res) => {
  // console.log("ssssss");

  let username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (hash) {
      console.log(hash);
      let sql =
        "INSERT INTO users (username, password) values ($1, $2) RETURNING userid";
      db.one(sql, [username, hash])
        .then(data => {
          res.json({ userid: data.userid });
        })
        .catch(error => {
          res.json({ message: "Register user failed: ", error });
        });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started");
});
