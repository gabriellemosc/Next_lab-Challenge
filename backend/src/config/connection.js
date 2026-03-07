require('dotenv').config()
const { Pool } = require('pg') 

const pool = new Pool({
  host: process.env.PG_HOST,        // novo nome
  user: process.env.PG_USER,        // novo nome
  password: process.env.PG_PASSWORD,// novo nome
  database: process.env.PG_NAME,    // novo nome
  port: process.env.PG_PORT         // novo nome
})

module.exports = pool