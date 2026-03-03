const multer = require('multer') 

//DO NOT SAVE IN DISK
const storage = multer.memoryStorage() // file buffer RAM


const upload = multer({
  storage,
  limits: { fileSize: 7 * 1024 * 1024 } 
})

module.exports = upload