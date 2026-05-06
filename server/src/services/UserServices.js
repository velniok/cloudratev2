const pool = require("../config/db")
const bcrypt = require('bcrypt')
const mapToCamelCase = require("../utils/toCamelCase")

class UserServices {

    async getUserList() {
        const usersRes = await pool.query(`
            SELECT *
            FROM users
            ORDER BY id
        `)
        return usersRes.rows.map(mapToCamelCase)
    }

    async getUserById(id) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1
        `, [id])
        return mapToCamelCase(userRes.rows[0])
    }

    async getUserByUsername(username) {
        const userRes = await pool.query(`
            SELECT 
                u.*,
                (
                    SELECT COUNT(*)::int
                    FROM reviews r
                    WHERE r.user_id = u.id
                ) as reviews_count,
                (
                    SELECT COUNT(*)::int
                    FROM reviews r
                    WHERE r.user_id = u.id AND r.text != ''
                ) as reviews_text_count
            FROM users u
            WHERE username = $1
        `, [username])
        return mapToCamelCase(userRes.rows[0])
    }

    async getUsersByEmail(email) {
        return await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])
    }

    async updateUserPassword(id, pass) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(pass, salt)
        await pool.query(`
            UPDATE users
            SET password = $2
            WHERE id = $1
            RETURNING *
        `, [id, hashPassword])
    }

    async updateUser(id, values) {
        const userRes = await pool.query(`
            WITH email_check AS (
                SELECT id
                FROM users
                WHERE email = $1 AND id != $6
            ),
            username_check AS (
                SELECT id FROM users
                WHERE username = $3 AND id != $6
            ),
            updated AS (
                UPDATE users
                SET
                    email = $1,
                    nickname = $2,
                    username = $3,
                    avatar_url = $4,
                    soundcloud_url = $5
                WHERE id = $6
                AND NOT EXISTS (SELECT 1 FROM email_check)
                AND NOT EXISTS (SELECT 1 FROM username_check)
                RETURNING *
            )
            SELECT
                CASE
                    WHEN EXISTS (SELECT 1 FROM email_check) THEN 'email_taken'
                    WHEN EXISTS (SELECT 1 FROM username_check) THEN 'username_taken'
                    ELSE 'ok'
                END as status,
                (
                    SELECT row_to_json(u)
                    FROM updated u
                ) as user
        `, [...values, id])
        return mapToCamelCase(userRes.rows[0])
    }

    async deleteUser(id) {
        await pool.query(`
            DELETE
            FROM users
            WHERE id = $1
        `, [id])
    }
}

module.exports = new UserServices()