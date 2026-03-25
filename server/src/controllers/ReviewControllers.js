const ReviewServices = require("../services/ReviewServices")
const AppError = require('../utils/AppError')

class ReviewControllers {
    async create(req, res, next) {
        try {
            const { text, userId, trackId, criteria1, criteria2, criteria3, criteria4, criteria5 } = req.body
            const rating = Math.round( ( (criteria1 * 1.3) + (criteria2 * 1.3) + (criteria3 * 1.3) + (criteria4 * 1.3) + (criteria5 * 1.8) ) )
            const createdReview = await ReviewServices.reviewCreate([text, rating, userId, trackId, criteria1, criteria2, criteria3, criteria4, criteria5])
            if (createdReview.status === 'user_taken') throw new AppError('Вы уже оставили отзыв на этот трек', 409)
            const review = createdReview.review

            res.status(201).json({ review })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getNewReviews(req, res, next) {
        try {
            const reviews = await ReviewServices.getNewReviews()

            res.status(200).json({ reviews })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async addText(req, res, next) {
        try {
            const reviewId = req.params.id
            const { text } = req.body

            await ReviewServices.addTextReviewById(reviewId, text)

            res.status(200).json({ message: 'Отзыв к оценке успешно добавлен' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async toggleLike(req, res, next) {
        try {
            const { reviewId, userId } = req.body
            const result = await ReviewServices.toggleLikeReview(reviewId, userId)

            res.status(200).json({ liked: !!result.rows[0] })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new ReviewControllers()