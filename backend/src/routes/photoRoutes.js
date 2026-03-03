const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload') // multer
const { createPhoto } = require('../controllers/photoController')

// POST /photos
router.post(
  '/',
  upload.single('image'), // espera campo "image"
  createPhoto
)

module.exports = router