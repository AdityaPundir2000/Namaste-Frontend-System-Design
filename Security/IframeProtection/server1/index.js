const express = require("express");
const app = express();

const PORT = process.env.PORT || 5010;

app.use(express.static("public"));

app.get('/example1', (req, res) => {
  res.sendFile(__dirname + "/public/example1.html");
});

app.get('/example2', (req, res) => {
  res.sendFile(__dirname + "/public/example2.html");
});

app.get('/example3', (req, res) => {
  res.sendFile(__dirname + "/public/example3.html");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
