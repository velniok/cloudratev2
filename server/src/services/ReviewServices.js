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

    async getReviewsByTrackId(trackId, userId) {
        const reviewsRes = await pool.query(`
            SELECT
                r.*,
                row_to_json(u) as user,
                (SELECT COUNT(*) FROM review_likes rl WHERE rl.review_id = r.id) as likes_count,
                (SELECT EXISTS (
                    SELECT 1 FROM review_likes rl2
                    WHERE rl2.review_id = r.id AND rl2.user_id = $2
                )) as is_liked
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE track_id = $1
            `, [trackId, userId])
        return reviewsRes.rows.map(mapToCamelCase)
    }

    async getReviewsByTrackIdWithText(page, limit, trackId, userId) {
        const offset = (+page - 1) * +limit
        const [reviewsRes, countRes] = await Promise.all([            
            pool.query(`
                SELECT
                    r.*,
                    row_to_json(u) as user,
                    (SELECT COUNT(*) FROM review_likes rl WHERE rl.review_id = r.id) as likes_count,
                    (SELECT EXISTS (
                        SELECT 1 FROM review_likes rl2
                        WHERE rl2.review_id = r.id AND rl2.user_id = $2
                    )) as is_liked
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                WHERE track_id = $1 AND text != ''
                ORDER BY created_at DESC
                LIMIT $3
                OFFSET $4
            `, [trackId, userId, limit, offset]),
            pool.query(`SELECT COUNT(*) AS total FROM reviews WHERE track_id = $1 AND text != ''`, [trackId])
        ])
        return {
            reviews: reviewsRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
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
            ORDER BY r.created_at DESC
            LIMIT 15
        `, [id])
        return reviewsRes.rows.map(mapToCamelCase)
    }

    async getReviewsByUserPagination(limit, page, userId) {
        const offset = (+page - 1) * +limit
        const [reviewsRes, countRes] = await Promise.all([
            pool.query(`
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
                WHERE r.user_id = $3
                ORDER BY r.created_at DESC
                LIMIT $1
                OFFSET $2
            `, [limit, offset, userId]),
            pool.query(`SELECT COUNT(*) AS total FROM reviews r WHERE r.user_id = $1`, [userId])
        ])
        return {
            reviews: reviewsRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
    }

    async getNewReviews() {
        const reviewsRes = await pool.query(`
            SELECT
                r.*,
                row_to_json(u) as user,
                row_to_json(t) as track
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            JOIN tracks t ON r.track_id = t.id
            WHERE r.text != '' AND r.text IS NOT NULL
            ORDER BY r.created_at DESC
            LIMIT 15
        `)
        return reviewsRes.rows.map(mapToCamelCase)
    }

    async addTextReviewById(id, text) {
        await pool.query(`
            UPDATE reviews
            SET text = $1
            WHERE id = $2
        `, [text, id])
    }

    async toggleLikeReview(reviewId, userId) {
        return await pool.query(`
            WITH deleted AS (
                DELETE FROM review_likes
                WHERE review_id = $1 and user_id = $2
                RETURNING id
            )
            INSERT INTO review_likes (review_id, user_id)
            SELECT $1, $2
            WHERE NOT EXISTS (SELECT 1 FROM deleted)
            RETURNING id
        `, [reviewId, userId])
    }
}

module.exports = new ReviewServices()