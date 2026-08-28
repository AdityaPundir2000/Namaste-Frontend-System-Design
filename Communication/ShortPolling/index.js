const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let data= "Initial data" ;
app.get("/getData", (req, res) => {
  res.send({ data });
});

app.get("/updateData", (req, res) => {
    data='updated data'
  res.send({ data });
});

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
