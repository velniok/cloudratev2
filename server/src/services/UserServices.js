const pool = require("../config/db")
const bcrypt = require('bcrypt')
const mapToCamelCase = require("../utils/toCamelCase")

class UserServices {

    async getAllUsers() {
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

    async getUsersByEmail(email) {
        return await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])
    }

    async updateUserPasswordById(id, pass) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(pass, salt)
        await pool.query(`
            UPDATE users
            SET password = $2
            WHERE id = $1
            RETURNING *
        `, [id, hashPassword])
    }

    async updateUserById(id, values) {
        const userRes = await pool.query(`
            WITH email_check AS (
                SELECT id
                FROM users
                WHERE email = $1 AND id != $4
            ),
            updated AS (
                UPDATE users
                SET
                    nickname = $2,
                    email = $1,
                    avatar_url = $3
                WHERE id = $4 AND NOT EXISTS (SELECT 1 FROM email_check)
                RETURNING *
            )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM email_check)
                THEN 'email_taken'
                ELSE 'ok' END as status,
                (
                    SELECT row_to_json(u)
                    FROM updated u
                ) as user
        `, [...values, id])
        return mapToCamelCase(userRes.rows[0])
    }

    async deleteUserById(id) {
        await pool.query(`
            DELETE
            FROM users
            WHERE id = $1
        `, [id])
    }
}

module.exports = new UserServices()