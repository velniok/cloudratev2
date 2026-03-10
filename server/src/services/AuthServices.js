const pool = require("../config/db")
const bcrypt = require('bcrypt')
const mapToCamelCase = require("../utils/toCamelCase")

class AuthServices {
    async registerUser(password, values) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUserRes = await pool.query(`
            WITH email_check AS (
                SELECT id
                FROM users
                WHERE email = $1
            ),
            inserted AS (
                INSERT INTO users
                (
                    email,
                    nickname,
                    password
                )
                SELECT $1, $2, $3
                WHERE NOT EXISTS (SELECT 1 FROM email_check)
                RETURNING *
            )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM email_check)
                THEN 'email_taken'
                ELSE 'ok' END as status,
                (
                    SELECT row_to_json(u)
                    FROM inserted u
                ) as user
        `, [...values, hashPassword])
        console.log(newUserRes.rows[0])
        return mapToCamelCase(newUserRes.rows[0])
    }

    async loginUser(email) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])
        return mapToCamelCase(userRes.rows[0])
    }

    async authUser(id) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1
        `, [id])
        return mapToCamelCase(userRes.rows[0])
    }
}

module.exports = new AuthServices()