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
                WHERE
                    REPLACE(LOWER(title), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')
                ORDER BY id`,
            artists:
                `SELECT *
                FROM artists
                WHERE
                    REPLACE(LOWER(name), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')`,
            users:
                `SELECT *
                FROM users
                WHERE
                    REPLACE(LOWER(nickname), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')`, 
        }
        const query = queries[filter]
        const resultRes = await pool.query(query, [`%${search}%`])
        return resultRes.rows.map(mapToCamelCase)
    }
}

module.exports = new SearchServices()