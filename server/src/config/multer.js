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

const upload = multer({
    storage: storage
})

const uploadFromSoundcloud = async (imageUrl) => {
    const result = await cloudinary.uploader.upload(imageUrl)
    return result.secure_url
}

module.exports = { upload, uploadFromSoundcloud }