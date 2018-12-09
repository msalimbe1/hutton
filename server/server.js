const express = require("express");
const app = express();

const games = [
  { id: 1, name: "la" },
  { id: 2, name: "le" },
  { id: 3, name: "lo" }
];

//404 Not found

app.get("/", (req, res) => {
  res.send("Hell World");
});

app.get("/api/games", (req, res) => {
  res.send(games);
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) res.status(404).send("Game not found");
  res.send(game);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
