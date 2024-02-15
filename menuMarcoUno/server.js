// Importa los módulos necesarios
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Crea una instancia de la aplicación Express
const app = express();

// Configura el puerto
const PORT = process.env.PORT || 3000;

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Davincci5555?',
  database: 'belicones'
});

// Conecta a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con la base de datos');
});

// Permite el intercambio de recursos entre origenes cruzados (CORS)
app.use(cors());

// Ruta para obtener todos los productos con el nombre del tipo de corte
app.get('/productos', (req, res) => {
  let sql = `
    SELECT carne.*, tipo_de_corte.tipo_de_corte AS nombre_tipo_corte 
    FROM carne 
    INNER JOIN tipo_de_corte ON carne.fk_id_tipo_de_corte = tipo_de_corte.id_tipo_de_corte
  `;

  // Obtener el valor seleccionado en el filtro del select
  const tipoSeleccionado = req.query.tipo;

  // Verificar el valor seleccionado y modificar la consulta SQL en consecuencia
  if (tipoSeleccionado === 'Cortes finos') {
    sql += ' WHERE tipo_de_corte.id_tipo_de_corte = 1';
  } else if (tipoSeleccionado === 'Cocina diaria') {
    sql += ' WHERE tipo_de_corte.id_tipo_de_corte = 2';
  } else if (tipoSeleccionado === 'Extras') {
    sql += ' WHERE tipo_de_corte.id_tipo_de_corte = 3';
  }

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener todos los tipos de productos
app.get('/tipos', (req, res) => {
  const sql = 'SELECT tipo_de_corte FROM tipo_de_corte';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los tipos de productos:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    // Mapea los resultados para obtener un arreglo de los tipos de productos
    const tipos = results.map(row => row.tipo_de_corte);
    res.json(tipos);
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
