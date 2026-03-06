const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class SearchServices {
    async searchByNameAndFilter(search, filter) {
        const queries = {
            tracks:
            `SELECT
                t.*,
                (
                    SELECT ROUND(AVG(r.rating)::numeric)
                    FROM reviews r
                    WHERE r.track_id = t.id
                ) as avg_rating,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(t.artist_ids)
                ) as artists
            FROM tracks t
            WHERE title ILIKE $1
            ORDER BY id`,
            artists: `SELECT * FROM artists WHERE name ILIKE $1`,
            users: `SELECT * FROM users WHERE nickname ILIKE $1`, 
        }
        const query = queries[filter]
        const resultRes = await pool.query(query, [`%${search}%`])
        return resultRes.rows.map(mapToCamelCase)
    }
}

module.exports = new SearchServices()