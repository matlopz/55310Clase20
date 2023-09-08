const initializeIO = require('./io');
const app = require('./app');

const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});


initializeIO(httpServer)

