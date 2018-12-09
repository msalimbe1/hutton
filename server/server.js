const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const games = [
  { id: 1, name: "la" },
  { id: 2, name: "le" },
  { id: 3, name: "lo" }
];

// ref.
//404 Not found
//400 Bad request

app.get("/", (req, res) => {
  res.send("Hell World");
});

app.get("/api/games", (req, res) => {
  res.send(games);
});

app.post("/api/games", (req, res) => {
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const game = {
    id: games.length++,
    name: req.body.name
  };
  games.push(game);
  res.send(game);
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("Game not found");
  res.send(game);
});

app.put("/api/games/:id", (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("Game not found");

  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  game.name = req.body.name;
  res.send(game);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.delete("/api/games/:id", (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("Game not found");

  const index = games.indexOf(game);
  games.splice(index, 1);
  res.send(games);
});

function validateGame(game) {
  const schema = {
    name: Joi.string()
      .min(2)
      .required()
  };
  return Joi.validate(game, schema);
}
