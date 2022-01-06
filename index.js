require("dotenv").config();
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const db = require("./util/parser");

let dbData;
db().then((data) => (dbData = data));

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/search", (req, res) => {
  if (req.query && req.query.q && req.query.q.length > 1) {
    const index = req.query.q.charCodeAt(0) - 97;
    let results = [];
    dbData[index] &&
      dbData[index].map((node) => {
        if (node["Search Terms"].indexOf(req.query.q) == 0) {
          results.push(node);
        }
      });
    res.status(200).send(results.slice(0, 10));
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
