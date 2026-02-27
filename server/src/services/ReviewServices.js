const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class ReviewServices {
    async getReviewsByTrackId(id) {
        const reviewsRes = await pool.query(`
            SELECT
                r.*,
                row_to_json(u) as user
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE track_id = $1
            `, [id])
        return reviewsRes.rows.map(mapToCamelCase)
    }

    async getReviewsByUserId(id) {
        const reviewsRes = await pool.query(`
            SELECT
                r.*,
                (
                    SELECT jsonb_build_object('artists', (
                        SELECT json_agg(row_to_json(a))
                        FROM artists a
                        WHERE a.id = ANY(t.artist_ids)
                    )) || row_to_json(t)::jsonb
                    FROM tracks t
                    WHERE t.id = r.track_id
                ) as track
            FROM reviews r
            WHERE r.user_id = $1
        `, [id])
        return reviewsRes.rows.map(mapToCamelCase)
    }
}

module.exports = new ReviewServices()