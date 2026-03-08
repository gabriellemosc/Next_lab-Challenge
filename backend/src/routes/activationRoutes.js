const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const authorize = require('../middlewares/authorize')
const upload = require('../middlewares/upload') //multer


const { uploadActivation } = require('../controllers/activationController')

// ACTIVATE FLOW
router.post(
  '/upload',
  authMiddleware, // VLIDATE TOKEN
  authorize(['PROMOTOR']), // ONLY PROMOTOR CAN ACESS TOKEN
  upload.single('image'),
  uploadActivation
)

module.exports = router