
// Import pool
const { Pool } = require('pg')

// create a poll with reuse connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL 
})

// export pool 
module.exports = pool