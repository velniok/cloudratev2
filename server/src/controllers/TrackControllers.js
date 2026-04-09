const { validationResult } = require("express-validator")
const ReviewServices = require("../services/ReviewServices")
const TrackServices = require("../services/TrackServices")
const AppError = require('../utils/AppError')
const axios = require('axios')
const { uploadFromSoundcloud } = require("../config/multer")

class TrackControllers {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const { title, coverUrl, soundcloudUrl, artistId, featArtistIds, releaseData } = req.body
            const trackCreate = await TrackServices.createTrack([title, coverUrl, soundcloudUrl, artistId, featArtistIds, releaseData])
            if (trackCreate.status === 'track_taken') throw new AppError(`Трек с таким названием уже существует`, 409, `title`)
            const track = trackCreate.track

            res.status(201).json({ track })
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
                .catch(() => {throw new AppError(`Трек не найден`, 404)})
            
            const coverUrl = await uploadFromSoundcloud(data.artwork_url.replace('-large.jpg', '-t500x500.jpg'))

            res.status(200).json({
                title: data.title,
                coverUrl: coverUrl,
                releaseData: data.created_at,
                soundcloudUrl: data.permalink_url
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getList(req, res, next) {
        try {
            const { page, limit } = req.query
            const { tracks, total } = await TrackServices.getTrackList(page, limit)

            res.status(200).json({
                tracks,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: Number(total),
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

    async getProfile(req, res, next) {
        try {
            const trackId = req.params.id
            const userId = req.userId
            const track = await TrackServices.getTrack(trackId, userId)

            res.status(200).json({ track })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getReviewsText(req, res, next) {
        try {
            const trackId = req.params.id
            const { page, limit } = req.query
            const userId = req.userId

            const { reviews, total } = await ReviewServices.getReviewsTextByTrack(page, limit, trackId, userId)
            res.status(200).json({
                reviews,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: Number(total),
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

            const trackId = req.params.id
            const { title, coverUrl, soundcloudUrl, releaseData } = req.body

            const trackUpdate = await TrackServices.updateTrack(trackId, [title, coverUrl, soundcloudUrl, releaseData])
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
            await TrackServices.deleteTrack(trackId)

            res.status(200).json({ message: 'Трек успешно удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new TrackControllers()