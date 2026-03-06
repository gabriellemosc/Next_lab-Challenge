const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload') // multer
const { createPhoto, deletePhoto } = require('../controllers/photoController')
const { getPhotos } = require('../controllers/photoController')


const authMiddleware = require('../middlewares/authMiddleware')
const authorize = require('../middlewares/authorize')


// POST /photos
router.post(
  '/',
  authMiddleware,
  upload.single('image'), // espera campo "image"
  createPhoto
)


//DELETE only for ADMIN
router.delete(
  '/:id',
  authMiddleware,
  authorize(['ADMIN']),
  deletePhoto
)

router.get('/', authMiddleware, getPhotos) // rota GET /photos


module.exports = router