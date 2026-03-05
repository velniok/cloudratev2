const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class ReviewServices {

    async reviewCreate(value) {
        const newReviewRes = await pool.query(`
            WITH user_check AS (
                SELECT id
                FROM reviews
                WHERE track_id = $4 AND user_id = $3
            ),
            inserted AS (
                INSERT INTO reviews
                (
                    text,
                    rating,
                    user_id,
                    track_id,
                    criteria1,
                    criteria2,
                    criteria3,
                    criteria4,
                    criteria5
                )
                SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
                WHERE NOT EXISTS (SELECT 1 FROM user_check)
                RETURNING *
            )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM user_check)
                THEN 'user_taken'
                ELSE 'ok' END as status,
                (
                    SELECT
                        row_to_json(r)::jsonb || jsonb_build_object('user', row_to_json(u)) 
                    FROM inserted r
                    JOIN users u ON r.user_id = u.id
                ) as review
        `, value)
        return mapToCamelCase(newReviewRes.rows[0])
    }

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

    async addTextReviewById(id, text) {
        await pool.query(`
            UPDATE reviews
            SET text = $1
            WHERE id = $2
        `, [text, id])
    }
}

module.exports = new ReviewServices()