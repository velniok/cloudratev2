const { validationResult } = require("express-validator")
const ReviewServices = require("../services/ReviewServices")
const TrackServices = require("../services/TrackServices")
const AppError = require('../utils/AppError')

class TrackControllers {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const { title, coverUrl, artistIds } = req.body
            const track = await TrackServices.createTrack([title, coverUrl, artistIds])

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

    async getOne(req, res, next) {
        try {
            const trackId = req.params.id
            const track = await TrackServices.getTrackById(trackId)
            track.reviews = await ReviewServices.getReviewsByTrackId(trackId)

            res.status(200).json({ track })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const trackId = req.params.id
            const { title, coverUrl } = req.body

            const track = await TrackServices.updateTrackById(trackId, [title, coverUrl])
            
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