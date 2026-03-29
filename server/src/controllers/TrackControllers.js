const { validationResult } = require("express-validator")
const ReviewServices = require("../services/ReviewServices")
const TrackServices = require("../services/TrackServices")
const AppError = require('../utils/AppError')

class TrackControllers {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const { title, coverUrl, soundcloudUrl, artistIds, releaseData } = req.body
            const trackCreate = await TrackServices.createTrack([title, coverUrl, soundcloudUrl, artistIds, releaseData])
            if (trackCreate.status === 'track_taken') throw new AppError(`Трек с таким названием уже существует`, 409, `title`)
            const track = trackCreate.track

            res.status(201).json({ track })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const { page, limit } = req.query
            const { tracks, total } = await TrackServices.getTracksPagination(page, limit)

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

    async getTracksByArtist(req, res, next) {
        try {
            const artistId = req.params.artistId
            const { page, limit } = req.query
            const { tracks, total } = await TrackServices.getTracksPaginationByArtist(page, limit, artistId)

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

    async getNewTracks(req, res, next) {
        try {
            const tracks = await TrackServices.getNewTracks()

            res.status(200).json({ tracks })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const trackId = req.params.id
            const { userId } = req.query
            const track = await TrackServices.getTrackById(trackId)
            track.reviews = await ReviewServices.getReviewsByTrackId(trackId, userId)

            res.status(200).json({ track })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const trackId = req.params.id
            const { title, coverUrl, soundcloudUrl, releaseData } = req.body

            const trackUpdate = await TrackServices.updateTrackById(trackId, [title, coverUrl, soundcloudUrl, releaseData])
            if (trackUpdate.status === 'track_taken') throw new AppError(`Название трека уже занято`, 409, `title`)
            const track = trackUpdate.track

            res.status(200).json({ track })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const trackId = req.params.id
            await TrackServices.deleteTrackById(trackId)

            res.status(200).json({ message: 'Трек успешно удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new TrackControllers()