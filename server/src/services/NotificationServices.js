const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class NotificationService {

    async get(userId) {
        const notificationRes = await pool.query(`
            SELECT *
            FROM notifications
            WHERE user_id = $1
            ORDER BY created_at DESC
        `, [userId])
        return notificationRes.rows.map(mapToCamelCase)
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