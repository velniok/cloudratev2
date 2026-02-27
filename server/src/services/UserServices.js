const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class UserServices {

    async getUserById(id) {
        const userRes = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1
        `, [id])
        return mapToCamelCase(userRes.rows[0])
    }
}

module.exports = new UserServices()