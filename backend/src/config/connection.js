require('dotenv').config()
const { Pool } = require('pg') 

const pool = new Pool({
  host: process.env.ACTIVACAO_DB_HOST,        
  user: process.env.ACTIVACAO_DB_USER,        
  password: process.env.ACTIVACAO_DB_PASSWORD,
  database: process.env.ACTIVACAO_DB_NAME,    
  port: process.env.ACTIVACAO_DB_PORT         
})

module.exports = pool