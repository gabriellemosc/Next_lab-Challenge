const pool = require('../database/connection') 
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 

//RECEIVE EMAIL, PASSWORD AND TOKEN 

const login = async (req, res) => {
  try {
    const { email, password } = req.body 

    const query = 'SELECT * FROM users WHERE email = $1'
    const result = await pool.query(query, [email])

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid Credentials' })
    }

    const user = result.rows[0]

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid Credentials' })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.ACTIVACAO_JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    return res.status(500).json({ 
      error: 'Login Error', 
      details: error.message 
    })
  } 
} 

module.exports = { login }