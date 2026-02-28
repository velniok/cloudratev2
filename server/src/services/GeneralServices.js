const pool = require("../config/db")

class GeneralServices {
    async getGenerals() {
        const general = await pool.query(`
            SELECT
                (SELECT COUNT(*) FROM users) as users,
                (SELECT COUNT(*) FROM artists) as artists,
                (SELECT COUNT(*) FROM tracks) as tracks,
                (SELECT COUNT(*) FROM reviews) as reviews
        `)
        return general.rows[0]
    }
}

module.exports = new GeneralServices()