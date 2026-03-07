const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.ACTIVACAO_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // O pooler do Supabase gerencia conexões, então não precisamos de um limite muito alto aqui
  max: 10 
});

module.exports = pool;