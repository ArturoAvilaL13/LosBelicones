const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3000;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

// LO SIGUIENTE NO ES NECESARIO (VERIFICAR)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'Davincci5555?', 
  database: 'carrito_compras'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(result);
    }
  });
});


app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de la aplicación de carrito de compras');
});


app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
