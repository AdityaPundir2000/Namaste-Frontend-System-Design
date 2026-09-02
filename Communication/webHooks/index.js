const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
    const payload = req.body;
    // Process the webhook payload here
    console.log("Received webhook payload:", payload);
    res.status(200).send("Webhook received successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
