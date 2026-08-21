import express from "express";

const app = express();

app.all("/", (req, res) => {
//   console.log(req);
//   console.log(res);
  res.send(`i'm UP`);
});

const PORT = 5111;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
