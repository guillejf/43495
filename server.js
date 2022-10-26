const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 100, nombre: 'monica', edad: 20 },
  { id: 101, nombre: 'jorge', edad: 21 },
  { id: 102, nombre: 'raul', edad: 22 },
  { id: 103, nombre: 'juana', edad: 23 },
];

//GET CON QUERY TIPO SEARCH (OJO QUE ES EL MISMO!)
app.get('/api/usuarios', (req, res) => {
  const { query } = req;

  if (query?.nombre) {
    const usuariosFiltrado = usuarios.filter(
      (usuario) => usuario.nombre == query.nombre
    );

    return res.json(usuariosFiltrado);
  }

  res.json(usuarios);
});

//POST CON BODY (SIN ID!!)
app.post('/api/usuarios', (req, res) => {
  const { body } = req;
  usuarios.push(body);
  res.json('ok');
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const usuarioEncontrado = usuarios.find((usuario) => usuario.id == id);
  if (usuarioEncontrado) {
    res.json({ success: true, user: usuarioEncontrado });
  } else {
    res.json({ error: true, msg: 'no encontrado' });
  }
});

//PUT CON ID PARAMS SIEMPRE y BODY!
app.put('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const indiceEncontrado = usuarios.findIndex((usuario) => usuario.id == id);
  if (indiceEncontrado >= 0) {
    usuarios[indiceEncontrado] = body;
    res.json({ success: true, user: body });
  } else {
    res.json({ error: true, msg: 'no encontrado' });
  }
});

//DELETE CON ID PARAMS SIEMPRE
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  usuarios = usuarios.filter((usuario) => usuario.id != id);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
