const { Pool } = require("pg");

console.log("DEBUG [connection.js]: Iniciando com Connection String...");

// Verifica se a URL principal existe
const hasUrl = !!process.env.ACTIVACAO_DATABASE_URL;
console.log("DEBUG: ACTIVACAO_DATABASE_URL presente?", hasUrl);

const pool = new Pool({
  connectionString: process.env.ACTIVACAO_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Listener de erro para capturar problemas na conexão
pool.on('error', (err) => {
  console.error('DEBUG [pool.error]:', err.message);
});

module.exports = pool;