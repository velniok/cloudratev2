const { body } = require('express-validator')

const suggestionValidation = [
    body('title').trim().notEmpty().withMessage("Укажите название трека"),
    body('artistId').custom((_, { req }) => {
        const artistId = req.body.artistId
        const tempArtist = req.body.tempArtist

        const hasArtistId = artistId !== undefined && artistId !== null && artistId !== ''
        const hasTempArtist = tempArtist !== undefined && tempArtist !== null && tempArtist !== ''

        if (!hasArtistId && !hasTempArtist) {
            throw new Error('Укажите хотя бы одного артиста')
        }
        return true
    }),
    body('soundcloudUrl')
        .trim().notEmpty().withMessage("Укажите ссылку на SoundCloud трека")
        .isURL().withMessage("Неверный формат ссылки"),
    body('releaseData')
        .notEmpty().withMessage("Укажите дату релиза трека")
        .isISO8601().toDate().withMessage('Введите корректную дату (YYYY-MM-DD)')
]

module.exports = suggestionValidation