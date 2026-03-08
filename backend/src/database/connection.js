const { Pool } = require("pg");

//MANAGE CONNECTION WITH BD

const pool = new Pool({
  connectionString: process.env.ACTIVACAO_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10 
});

module.exports = pool;