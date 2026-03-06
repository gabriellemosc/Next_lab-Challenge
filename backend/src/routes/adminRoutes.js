const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const authorize = require('../middlewares/authorize')

const { getAdminPhotos, getAdminStats } = require('../controllers/adminController')


// GET /admin/photos
router.get(
  '/photos',
  authMiddleware, // verifica token JWT
  authorize(['ADMIN']), // apenas admin pode acessar
  getAdminPhotos // retorna fotos com paginação
)


// GET /admin/stats
router.get(
  '/stats',
  authMiddleware,
  authorize(['ADMIN']),
  getAdminStats // retorna números macros do dashboard
)

module.exports = router