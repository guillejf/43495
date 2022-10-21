const express = require("express");
const Contenedor = require("./classContainer");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  const contenedor = new Contenedor();

  const todos = await contenedor.getAll();
  res.json(todos);
});

app.get("/matias", (req, res) => {
  res.json({ id: 102, name: "mati", age: 40 });
});

app.get("/random", (req, res) => {
  res.json({ id: 103, name: "sofia", age: 50 });
});

app.get("/alumnos", async (req, res) => {
  const todos = await contenedor.getAll();
  res.json([
    { id: 100, name: "carla", age: 20 },
    { id: 101, name: "guille", age: 30 },
    { id: 102, name: "mati", age: 40 },
    { id: 103, name: "sofia", age: 50 },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
