const nodemailer = require('nodemailer')
const pool = require('../config/db')
const AppError = require('../utils/AppError');
const crypto = require('crypto');
require('dotenv').config()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    async sendVerifyCode(email) {
        const usersRes = await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])
        if (usersRes.rows.length > 0) throw new AppError('Пользователь с таким email уже существует', 409, 'email')

        await pool.query('DELETE FROM verify_codes WHERE email = $1', [email])

        const code = this.generateCode()
        await pool.query(`
            INSERT INTO verify_codes (email, code)
            VALUES ($1, $2)
        `, [email, code])

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Активация аккаунта на CloudRate',
            text: '',
            html:
                `
                    <div>
                        <h1>Ваш код активации</h1>
                        <h2 style="letter-spacing: 8px">${code}</h2>
                        <p>Код действителен 10 минут</p>
                    </div>
                `
        }, (err, info) => {
            if (err) {
                return console.log("Ошибка при отправке почты: ", err)
            }
            console.log('Сообщение отправлено: ', info.response)
        })
    }

    async forgotPassword(email) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])

        const token = crypto.randomBytes(32).toString('hex')
        const hashToken = crypto.createHash('sha256').update(token).digest('hex')
        const expiry = new Date(Date.now() + 15 * 60 * 1000)

        await pool.query(`
            UPDATE users
            SET
                reset_token = $1,
                reset_token_expiry = $2
            WHERE email = $3
        `, [hashToken, expiry, email])

        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Восстановление пароля на CloudRate',
            text: '',
            html:
                `
                    <div>
                        <h1>Сброс пароля</h1>
                        <p>Ссылка действительна <strong>15 минут</strong></p>
                        <a href="${resetLink}">Сбросить пароль</a>
                        <p>Если вы не запрашивали сброс — проигнорируйте письмо.</p>
                    </div>
                `
        }, (err, info) => {
            if (err) {
                return console.log("Ошибка при отправке почты: ", err)
            }
            console.log('Сообщение отправлено: ', info.response)
        })
    }
}

module.exports = new MailService()