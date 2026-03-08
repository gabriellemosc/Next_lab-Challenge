const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token NOT SEND' })
  }

  const token = authHeader.split(' ')[1] // remove "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.ACTIVACAO_JWT_SECRET)

    req.user = decoded // ADD USER ON REQUEST

    next()
  } catch (error) {
    return res.status(401).json({ error: 'INVALID TOKEN' })
  }
}

module.exports = authMiddleware