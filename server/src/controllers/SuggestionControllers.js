const { validationResult } = require('express-validator')
const SuggestionServices = require('../services/SuggestionServices')
const TrackServices = require('../services/TrackServices')
const AppError = require('../utils/AppError')

class SuggestionControllers {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const { title, artistId, featArtistIds, soundcloudUrl, coverUrl, releaseData, tempArtist, tempFeatArtists } = req.body
            const userId = req.userId
            if (!userId) throw new AppError(`Нужно авторизоваться`, 401)
            
            await SuggestionServices.createSuggestion([title, coverUrl, soundcloudUrl, artistId, featArtistIds, releaseData, tempArtist, tempFeatArtists], userId)
            res.status(201).json({ message: 'Заявка отправлена' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getList(req, res, next) {
        try {
            const suggestions = await SuggestionServices.getSuggestionList()

            res.status(200).json({ suggestions })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async updateArtist(req, res, next) {
        try {
            const suggestionId = req.params.id
            const { id } = req.body
            const suggestion = await SuggestionServices.updateSuggestionArtist(suggestionId, id)

            res.status(200).json({ suggestion })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async updateFeat(req, res,next) {
        try {
            const suggestionId = req.params.id
            const { id, tempId } = req.body
            const suggestion = await SuggestionServices.updateSuggestionFeat(suggestionId, id, tempId)

            res.status(200).json({ suggestion })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
 
    async accept(req, res, next) {
        try {
            const { suggestion } = req.body
            const adminId = req.userId
            const trackCreate = await TrackServices.createTrack([suggestion.title, suggestion.coverUrl, suggestion.soundcloudUrl, suggestion.artistId, suggestion.featArtistIds, suggestion.releaseData])
            const newSuggestion = await SuggestionServices.acceptSuggestion(suggestion.id, adminId, trackCreate.track.id)

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

    async reject(req, res, next) {
        try {
            const { suggestion } = req.body
            const adminId = req.userId
            const newSuggestion = await SuggestionServices.rejectSuggestion(suggestion.id, adminId, 'ТЕСТ ПРИЧИНА')

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