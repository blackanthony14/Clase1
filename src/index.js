// Declaracion de variables y paquetes a usar
const express = require('express');
const morgan = require('morgan');
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;
const prisma = new PrismaClient();

// Utilizar los paquetes para el servidor
app.use(express.json());
app.use(morgan('dev'));

// Montamos el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
})

//Rutas
app.get('/', (req, res) => {
    res.send('Hola Mundo'); // Mostramos Hola mundo en la pagina
})

app.post('/registro', async (req, res) => {
    const {nombre, apellido, edad} = req.body; // Obtenemos los datos del formulario
    const usuario = await prisma.usuario.create({
        data: {
            nombre: nombre,
            apellido: apellido,
            edad: edad
        }
    });
    res.json(usuario);
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
})

app.get('/usuario/:id', async (req, res) => {
    const {id} = req.params;
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(id)
        }
    });
    res.json(usuario);
})

app.delete('/usuario/:id', async (req, res) => {
    const {id} = req.params;
    const usuario = await prisma.usuario.delete({
        where: {
            id: Number(id)
        }
    });
    res.json(usuario);
})

app.put("/usuario/:id", async (req, res) => {
    const {id} = req.params;
    const { nombre, apellido, edad } = req.body;
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data:{
        nombre: nombre,
        apellido: apellido,
        edad: edad
      },
    });
    res.send(usuario);
  })

  app.delete("/allUsers",async function(req, res) {
    const usuarios = await prisma.usuario.deleteMany();
    res.send(usuarios);
  });