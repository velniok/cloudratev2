const { validationResult } = require("express-validator")
const ArtistServices = require("../services/ArtistServices")
const AppError = require('../utils/AppError')
const TrackServices = require("../services/TrackServices")
const { uploadFromSoundcloud } = require("../config/multer")
const axios = require('axios')

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

    async getSoundcloudInfo(req, res, next) {
        try {
            const { url } = req.query
            const clientId = 'tkIWLs4MIowq7bCXP80TOwx6DnDa7UPc'
            const { data } = await axios.get(
                `https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${clientId}`
            )

            const avatarUrl = await uploadFromSoundcloud(data.avatar_url)
            res.status(200).json({
                name: data.username,
                soundcloudUrl: data.permalink_url,
                avatarUrl: avatarUrl
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getList(req, res, next) {
        try {
            const { limit, page } = req.query
            const { artists, total } = await ArtistServices.getArtistList(limit, page)
            
            res.status(200).json({
                artists,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
 
    async getProfile(req, res, next) {
        try {
            const artistId = req.params.id
            const userId = req.userId
            const { artist, follow } = await ArtistServices.getArtist(artistId, userId)
            artist.follow = follow

            res.status(200).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getTracks(req, res, next) {
        try {
            const artistId = req.params.id
            const { page, limit } = req.query
            const { tracks, total } = await TrackServices.getTracksByArtist(page, limit, artistId)

            res.status(200).json({
                tracks,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            })
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
            const artistUpdated = await ArtistServices.updateArtist(artistId, [name, avatarUrl, soundcloudUrl])
            if (artistUpdated.status === 'artist_taken') throw new AppError('Артист уже существует', 405, 'name')
            const artist = artistUpdated.artist

            res.status(200).json({ artist })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async toggleFollow(req, res, next) {
        try {
            const {artistId, userId} = req.body
            const result = await ArtistServices.toggleFollow(artistId, userId)

            res.status(200).json({ followed:  !!result.rows[0]})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const artistId = req.params.id
            await ArtistServices.deleteArtist(artistId)

            res.status(200).json({ message: 'Артист удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new ArtistControllers()