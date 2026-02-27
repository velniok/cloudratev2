const ReviewServices = require("../services/ReviewServices")
const TrackServices = require("../services/TrackServices")

class TrackControllers {
    async create(req, res) {
        try {
            const { title, coverUrl, artistIds } = req.body
            const track = await TrackServices.createTrack([title, coverUrl, artistIds])

            res.status(201).json({track})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось создать трек"
            })
        }
    }

    async get(req, res) {
        try {
            const tracks = await TrackServices.getAllTracks()

            res.status(200).json({tracks})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось получить треки"
            }) 
        }
    }

    async getOne(req, res) {
        try {
            const trackId = req.params.id
            const track = await TrackServices.getTrackById(trackId)
            track.reviews = await ReviewServices.getReviewsByTrackId(trackId)

            res.status(200).json({track})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось получит трек"
            }) 
        }
    }

    async delete(req, res) {
        try {
            const trackId = req.params.id
            await TrackServices.deleteTrackById(trackId)

            res.status(200).json({
                message: 'Трек успешно удален'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось удалить трек"
            }) 
        }
    }
}

module.exports = new TrackControllers()