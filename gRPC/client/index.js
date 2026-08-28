const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---- GET customer by id ----
app.get("/customer/:id", (req, res) => {
  const { id } = req.params;

  client.get({ id }, (err, response) => {
    if (err) {
      // gRPC error code ko HTTP status me map kar rahe hain
      const status = err.code === grpcNotFoundCode() ? 404 : 500;
      return res.status(status).json({ error: err.message });
    }
    res.json(response);
  });
});

// ---- INSERT new customer ----
app.post("/customer", (req, res) => {
  const { id, name, email } = req.body;

  client.insert({ id, name, email }, (err, response) => {
    if (err) {
      return res
        .status(err.code === 6 ? 409 : 500)
        .json({ error: err.message });
      // code 6 = ALREADY_EXISTS in grpc.status
    }
    res.status(201).json(response);
  });
});

// ---- UPDATE existing customer ----
app.put("/customer/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  client.update({ id, data: { name, email } }, (err, response) => {
    if (err) {
      return res
        .status(err.code === 5 ? 404 : 500)
        .json({ error: err.message });
      // code 5 = NOT_FOUND
    }
    res.json(response);
  });
});

// ---- DELETE customer ----
app.delete("/customer/:id", (req, res) => {
  const { id } = req.params;

  client.remove({ id }, (err, response) => {
    if (err) {
      return res
        .status(err.code === 5 ? 404 : 500)
        .json({ error: err.message });
    }
    res.json({ message: "Customer deleted", ...response });
  });
});

// helper (grpc.status.NOT_FOUND ka number 5 hota hai)
function grpcNotFoundCode() {
  return 5;
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
