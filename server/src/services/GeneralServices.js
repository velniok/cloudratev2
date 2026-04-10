const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class GeneralServices {
    async getGenerals() {
        const generalRes = await pool.query(`
            SELECT
                (SELECT COUNT(*) FROM users) as users,
                (SELECT COUNT(*) FROM artists) as artists,
                (SELECT COUNT(*) FROM tracks) as tracks,
                (SELECT COUNT(*) FROM reviews) as reviews,
                (SELECT COUNT(*) FROM track_suggestions) as track_suggestions
        `)
        return mapToCamelCase(generalRes.rows[0])
    }
}

module.exports = new GeneralServices()