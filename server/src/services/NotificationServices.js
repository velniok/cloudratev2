const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class NotificationService {

    async get(userId, page, limit) {
        if (!page) page = 1
        if (!limit) limit = 10
        const offset = (+page - 1) * +limit
        const [notificationsRes, countRes] = await Promise.all([
            pool.query(`
                SELECT *
                FROM notifications
                WHERE user_id = $1
                ORDER BY created_at DESC
                LIMIT $2
                OFFSET $3
            `, [userId, limit, offset]),
            pool.query(`SELECT COUNT(*) AS total FROM notifications WHERE user_id = $1`, [userId])
        ])
        return {
            notifications: notificationsRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
    }

    async read(id) {
        await pool.query(`
            UPDATE notifications
            SET is_read = true
            WHERE id = $1
        `, [id])
    }
}

module.exports = new NotificationService()