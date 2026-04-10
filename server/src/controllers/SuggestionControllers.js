const SuggestionServices = require('../services/SuggestionServices')
const TrackServices = require('../services/TrackServices')
const AppError = require('../utils/AppError')

class SuggestionControllers {
    async createTrack(req, res, next) {
        try {
            const { title, artistId, featArtistIds, soundcloudUrl, coverUrl, releaseData } = req.body
            const userId = req.userId
            if (!userId) throw new AppError(`Нужно авторизоваться`, 401)
            
            await SuggestionServices.createSuggestionTrack([title, coverUrl, soundcloudUrl, artistId, featArtistIds, releaseData], userId)
            res.status(201).json({ message: 'Заявка отправлена' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getTracks(req, res, next) {
        try {
            const suggestions = await SuggestionServices.getSuggestionTracks()

            res.status(200).json({ suggestions })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async acceptTrack(req, res, next) {
        try {
            const { suggestion } = req.body
            const adminId = req.userId
            const trackCreate = await TrackServices.createTrack([suggestion.title, suggestion.coverUrl, suggestion.soundcloudUrl, suggestion.artistId, suggestion.featArtistIds, suggestion.releaseData])
            const newSuggestion = await SuggestionServices.acceptSuggestionTrack(suggestion.id, adminId, trackCreate.track.id)

            res.status(200).json({
                suggestion: {
                    ...newSuggestion,
                    user: suggestion.user,
                    artist: suggestion.artist,
                    featArtists: suggestion.featArtists
                }
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async rejectTrack(req, res, next) {
        try {
            const { suggestion } = req.body
            const adminId = req.userId
            const newSuggestion = await SuggestionServices.rejectSuggestionTrack(suggestion.id, adminId, 'ТЕСТ ПРИЧИНА')

            res.status(200).json({
                suggestion: {
                    ...newSuggestion,
                    user: suggestion.user,
                    artist: suggestion.artist,
                    featArtists: suggestion.featArtists
                }
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new SuggestionControllers()