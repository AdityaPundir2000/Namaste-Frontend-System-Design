const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
// creating a socket server
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
// creating an io instance of our HTTP server, a wrapper around it
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("chat message", (msg) => {
    // emitting to all those connected to this connection
    io.emit("chat message", msg);
  });
  socket.on("disconnected", () => {
    console.log("user-disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
