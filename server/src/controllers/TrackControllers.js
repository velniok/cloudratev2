const ReviewServices = require("../services/ReviewServices")
const TrackServices = require("../services/TrackServices")

class TrackControllers {
    async create(req, res, next) {
        try {
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
            const tracks = await TrackServices.getAllTracks()

            res.status(200).json({ tracks })
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