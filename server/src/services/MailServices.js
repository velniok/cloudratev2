const nodemailer = require('nodemailer')
const pool = require('../config/db')
const AppError = require('../utils/AppError');
require('dotenv').config()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
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
}

module.exports = new MailService()