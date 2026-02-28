const ReviewServices = require("../services/ReviewServices")

class ReviewControllers {
    async create(req, res, next) {
        try {
            const { text, userId, trackId, criteria1, criteria2, criteria3, criteria4, criteria5 } = req.body

            const rating = criteria1 + criteria2 + criteria3 + criteria4 + criteria5
            const review = await ReviewServices.reviewCreate([text, rating, userId, trackId, criteria1, criteria2, criteria3, criteria4, criteria5])

            res.status(201).json({ review })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new ReviewControllers()