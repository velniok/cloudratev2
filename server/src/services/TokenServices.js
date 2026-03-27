const jwt = require('jsonwebtoken')
require('dotenv').config()

class TokenServices {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return { accessToken, refreshToken }
    }

    validateAccessToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) 
            return decoded
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) 
            return decoded
        } catch (err) {
            return null
        }
    }
}

module.exports = new TokenServices()