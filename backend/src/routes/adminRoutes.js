const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const authorize = require('../middlewares/authorize')

const { getAdminPhotos, getAdminStats } = require('../controllers/adminController')


// GET /admin/photos
router.get(
  '/photos',
  authMiddleware, 
  authorize(['ADMIN']), 
  getAdminPhotos 
)


// GET /admin/stats
router.get(
  '/stats',
  authMiddleware,
  authorize(['ADMIN']),
  getAdminStats 
)

module.exports = router