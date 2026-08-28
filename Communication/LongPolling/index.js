const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let data = "Initial data";
let waitingClients = [];
app.get("/getData", (req, res) => {
  if (req.query.lastData !== data) {
    res.json({ data });
  } else {
    waitingClients.push(res);
  }
});

app.get("/updateData", (req, res) => {
  data = req.query.data;
  while (waitingClients.length > 0) {
    const clientRes = waitingClients.pop();
    clientRes.json({ data });
  }
  res.send({ message: "Data updated successfully" });
});

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
