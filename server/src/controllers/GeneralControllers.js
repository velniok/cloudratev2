const pool = require("../config/db")

class GeneralControllers {
    async get(req, res) {
        try {
            const tracksRes = await pool.query('SELECT COUNT(*) FROM tracks')
            const tracks = Number(tracksRes.rows[0].count)

            const artistsRes = await pool.query('SELECT COUNT(*) FROM artists')
            const artists = Number(artistsRes.rows[0].count)

            const usersRes = await pool.query('SELECT COUNT(*) FROM users')
            const users = Number(usersRes.rows[0].count)

            const reviewsRes = await pool.query('SELECT COUNT(*) FROM reviews')
            const reviews = Number(reviewsRes.rows[0].count)
            
            res.status(200).json({general: {tracks, artists, users, reviews}})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалость получить статистику по сайту'
            })
        }
    }
}

module.exports = new GeneralControllers()