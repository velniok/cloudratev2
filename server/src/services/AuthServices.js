const pool = require("../config/db")
const bcrypt = require('bcrypt')
const mapToCamelCase = require("../utils/toCamelCase")
const AppError = require('../utils/AppError');
require('dotenv').config()

class AuthServices {
    async register(password, values, verifyCode) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const verifyCodeRes = await pool.query(`
            SELECT * FROM verify_codes
            WHERE email = $1 AND code = $2 AND expires_at > NOW()
        `, [values[0], verifyCode])

        if (!verifyCodeRes.rows[0]) throw new AppError('Код неверный или истёк', 409, 'verifyCode')

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

        return mapToCamelCase(newUserRes.rows[0])
    }

    async login(email) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])
        return mapToCamelCase(userRes.rows[0])
    }

    async auth(id) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1
        `, [id])
        return mapToCamelCase(userRes.rows[0])
    }
}

module.exports = new AuthServices()