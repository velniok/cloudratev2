const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const path = require('path')
const getPublicId = require('../utils/getPublicId')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const { folder } = req.query
        return {
            folder: folder,
            allowed_formats: ['jpg', 'png', 'jpeg']
        }

    },
})

const upload = multer({
    storage: storage
})

const uploadFromSoundcloud = async (imageUrl) => {
    const result = await cloudinary.uploader.upload(imageUrl, { folder: 'temp' })
    return result.secure_url
}

const deleteImg = async (url) => {
    const publicId = getPublicId(url)
    await cloudinary.uploader.destroy(publicId)
}

module.exports = { upload, uploadFromSoundcloud, deleteImg }