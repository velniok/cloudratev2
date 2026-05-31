const pool = require("../config/db")
const bcrypt = require('bcrypt')
const mapToCamelCase = require("../utils/toCamelCase")
const crypto = require('crypto')
const AppError = require('../utils/AppError');

class UserServices {

    async getUserList(limit, page, search) {
        const offset = (+page - 1) * +limit
        const [usersRes, countRes] = await Promise.all([
            pool.query(`
                SELECT
                    *,
                    (
                        SELECT
                            COALESCE(json_agg(
                                json_build_object(
                                    'badge_name', ub.badge_name,
                                    'is_selected', ub.is_selected
                                )
                            ), '[]')
                        FROM user_badges ub
                        WHERE user_id = u.id
                    ) as badges
                FROM users u
                WHERE
                    REPLACE(LOWER(nickname), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($3), 'ё', 'е')
                ORDER BY id
                LIMIT $1
                OFFSET $2
            `, [limit, offset, `%${search}%`]),
            pool.query(`
                SELECT
                    COUNT(*) AS total
                FROM users
                WHERE
                    REPLACE(LOWER(nickname), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')
            `, [`%${search}%`])
        ])
            
        return {
            users: usersRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
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
                ) as reviews_text_count,
                (
                    SELECT
                        COALESCE(json_agg(
                            json_build_object(
                                'badge_name', ub.badge_name,
                                'is_selected', ub.is_selected,
                                'created_at', ub.created_at
                            )
                        ), '[]')
                    FROM user_badges ub
                    WHERE user_id = u.id
                ) as badges
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
                WHERE LOWER(email) = LOWER($1) AND id != $6
            ),
            username_check AS (
                SELECT id FROM users
                WHERE LOWER(username) = LOWER($3) AND id != $6
            ),
            updated AS (
                UPDATE users
                SET
                    email = $1,
                    nickname = $2,
                    username = COALESCE($3, username),
                    avatar_url = $4,
                    soundcloud_url = $5
                WHERE id = $6
                AND NOT EXISTS (SELECT 1 FROM email_check)
                AND NOT EXISTS (SELECT 1 FROM username_check)
                RETURNING *, (SELECT avatar_url FROM users WHERE id = $6 AND NOT EXISTS (SELECT 1 FROM email_check) AND NOT EXISTS (SELECT 1 FROM username_check)) as old_avatar_url
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

    async resetPassword(newPassword, token) {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE reset_token = $1 AND reset_token_expiry > NOW()
        `, [hashedToken])

        if (!userRes.rows[0]) throw new AppError('Токен недействителен или истёк', 409, 'token')

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)

        await pool.query(`
            UPDATE users 
            SET
                password = $1,
                reset_token = NULL,
                reset_token_expiry = NULL 
            WHERE id = $2
        `, [hashPassword, userRes.rows[0].id])
    }
}

module.exports = new UserServices()