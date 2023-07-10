const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
//const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 3000;

let tasks = [
  { id: 0, text: "take the dog for a walk" },
  { id: 1, text: "do homework" },
];

let id = 2;

app.use(cors());

app.get("/api/tasks", (req, res) => {
  res.send(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("there is no id sent");
    return;
  }
  const task = tasks.find((t) => t.id == id);
  if (!task) {
    res.status(404).send("data not found");
    return;
  }
  res.json(task);
});

app.post("/api/tasks", jsonParser, (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).send("there is missing data");
    return;
  }
  let task = { id: id++, text: text };
  tasks.push(task);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("there is no id");
    return;
  }
  try {
    tasks = tasks.filter((t) => t.id != id);
    res.json(tasks);
  } catch (error) {}
});

app.put("/api/tasks/:id", jsonParser, (req, res) => {
  const { id, text } = req.body;
  const pId = req.params.id;
  if (!pId) {
    res.status(400).send("there is no id");
    return;
  }
  if (id != pId) {
    res.status(400).send("param id and body id need to be matched");
    return;
  }
  if (!text) {
    res.status(400).send("price or product name is missing from body");
    return;
  }
  let task = tasks.find((t) => t.id == id);
  if (!task) {
    res.status(404).send(`customer with id:${id} not found`);
    return;
  }
  task.text = text;
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`listening to port:  ${PORT}`);
});
