const express = require("express");
const app = express();

const PORT = process.env.PORT || 5011;

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  next();
});

app.get('/iframe-example1', (req, res) => {
  res.sendFile(__dirname + "/public/iframe-example1.html");
});

app.get('/iframe-example2', (req, res) => {
  res.sendFile(__dirname + "/public/iframe-example2.html");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
