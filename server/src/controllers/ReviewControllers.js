const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class ReviewControllers {
    async create(req, res) {
        try {
            const { text, rating, userId, trackId } = req.body

            const newReviewRes = await pool.query('INSERT INTO reviews (text, rating, user_id, track_id) VALUES ($1, $2, $3, $4) RETURNING *', [text, rating, userId, trackId])
            const review = mapToCamelCase(newReviewRes.rows[0])

            res.status(201).json({review})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось создать отзыв'
            })
        }
    }
}

module.exports = new ReviewControllers()