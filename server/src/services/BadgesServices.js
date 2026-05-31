const pool = require("../config/db");

class BadgeServices {
    async awardBetaBadge(userId) {
        const { rows } = await pool.query(`
            WITH has AS (
                SELECT 1 FROM user_badges
                WHERE user_id = $1 AND badge_name = 'beta'
            ),
            reviews AS (
                SELECT
                    COUNT(*) FILTER (WHERE text != '') as reviews_with_text,
                    COUNT(*) FILTER (WHERE text = '') as reviews_without_text
                FROM reviews
                WHERE user_id = $1
            ),
            suggestions AS (
                SELECT COUNT(*) as suggestions
                FROM track_suggestions
                WHERE user_id = $1
            )
            SELECT
                EXISTS (SELECT 1 FROM has) as has,
                (r.reviews_with_text >= 1 OR r.reviews_without_text >= 3) AND s.suggestions >= 3 as eligible
            FROM reviews r, suggestions s
        `, [userId])

        const { has, eligible } = rows[0]

        if (has || !eligible) return false

        await pool.query(`
            INSERT INTO user_badges
            (
                user_id,
                badge_name,
                is_selected
            )
            VALUES ($1, 'beta', true)
            ON CONFLICT (user_id, badge_name) DO NOTHING
        `, [userId])

        return true
    }
}

module.exports = new BadgeServices()