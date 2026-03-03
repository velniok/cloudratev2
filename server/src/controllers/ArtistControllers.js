const { validationResult } = require("express-validator")
const ArtistServices = require("../services/ArtistServices")
const AppError = require('../utils/AppError')

class ArtistControllers {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const { name, soundcloudUrl, avatarUrl } = req.body
            const artistCreated = await ArtistServices.createArtist([name, soundcloudUrl, avatarUrl])
            if (artistCreated.status === 'artist_taken') throw new AppError('Артист уже существует', 405, 'name')
            const artist = artistCreated.artist

            res.status(201).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const artists = await ArtistServices.getAllArtists()

            res.status(200).json({ artists })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const artistId = req.params.id
            const artist = await ArtistServices.getArtistById(artistId)

            res.status(200).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const artistId = req.params.id
            const { name, avatarUrl, soundcloudUrl } = req.body
            const artistUpdated = await ArtistServices.updateArtistById(artistId, [name, avatarUrl, soundcloudUrl])
            if (artistUpdated.status === 'artist_taken') throw new AppError('Артист уже существует', 405, 'name')
            const artist = artistUpdated.artist

            res.status(200).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async search(req, res, next) {
        try {
            const { search } = req.query
            const artists = await ArtistServices.searchArtistsByName(search)

            res.status(200).json({ artists })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const artistId = req.params.id
            await ArtistServices.deleteArtistById(artistId)

            res.status(200).json({ message: 'Артист удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new ArtistControllers()