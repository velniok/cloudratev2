const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class ArtistControllers {
    async create(req, res) {
        try {
            const { name, soundcloudUrl, avatarUrl } = req.body

            const newArtistRes = await pool.query('INSERT INTO artists (name, soundcloud_url, avatar_url) VALUES ($1, $2, $3) RETURNING *', [name, soundcloudUrl, avatarUrl])
            const artist = mapToCamelCase(newArtistRes.rows[0])

            res.status(201).json({artist})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось создать артиста"
            })
        }
    }

    async get(req, res) {
        try {
            const artistsRes = await pool.query('SELECT * FROM artists ORDER BY id')
            const artists = artistsRes.rows.map((artist) => {
                return mapToCamelCase(artist)
            })

            res.status(200).json({artists})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалость получить артистов"
            })
        }
    }

    async getOne(req, res) {
        try {
            const artistId = req.params.id

            const artistRes = await pool.query('SELECT * FROM artists WHERE id = $1', [artistId])
            const artist = mapToCamelCase(artistRes.rows[0])

            res.status(200).json({artist})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалость получить артиста"
            })
        }
    }

    async update(req, res) {
        try {
            const artistId = req.params.id
            const { name, avatarUrl, soundcloudUrl } = req.body

            const artistRes = await pool.query('UPDATE artists SET name = $2, avatar_url = $3, soundcloud_url = $4 WHERE id = $1 RETURNING *', [artistId, name, avatarUrl, soundcloudUrl])
            const artist = mapToCamelCase(artistRes.rows[0])

            res.status(200).json({artist})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось изменить артиста"
            })
        }
    }

    async search(req, res) {
        try {
            const { search } = req.query
            const artistsRes = await pool.query(`SELECT * FROM artists WHERE REPLACE(LOWER(name), 'ё', 'е') ILIKE REPLACE(LOWER($1), 'ё', 'е')`, [`%${search}%`])
            const artists = artistsRes.rows.map((artist) => {
                return mapToCamelCase(artist)
            })

            res.status(200).json({artists})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось найти артиста"
            }) 
        }
    }

    async delete(req, res) {
        try {
            const artistId = req.params.id

            await pool.query('DELETE FROM artists WHERE id = $1', [artistId])

            res.status(200).json({
                message: 'Артист удален'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалость удалить артиста"
            })
        }
    }
}

module.exports = new ArtistControllers()