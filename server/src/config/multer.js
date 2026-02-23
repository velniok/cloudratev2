const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const path = require('path')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
})

// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, path.join(__dirname, '../../uploads/images'))
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const ext = path.extname(file.originalname)
//         cb(null, file.filename + '-' + uniqueSuffix + ext)
//     }
// })

const upload = multer({
    storage: storage
})

module.exports = upload