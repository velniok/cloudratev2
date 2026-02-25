const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class TrackControllers {
    async create(req, res) {
        try {
            const { title, coverUrl, artist } = req.body

            const newTrackRes = await pool.query('INSERT INTO tracks (title, cover_url, artist) VALUES ($1, $2, $3) RETURNING *', [title, coverUrl, artist])
            const track = mapToCamelCase(newTrackRes.rows[0])

            res.status(201).json({track})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось создать трек"
            })
        }
    }

    async get(req, res) {
        try {
            const tracksRes = await pool.query('SELECT * FROM tracks')
            const tracks = tracksRes.rows.map((track) => {
                return mapToCamelCase(track)
            })

            for (let track of tracks) {
                const artistIds = track.artistIds
                const placeholders = artistIds.map((_, index) => `$${index + 1}`).join(',');
                const artistsRes = await pool.query(`SELECT * FROM artists WHERE id IN (${placeholders})`, artistIds)
                const artists = artistsRes.rows.map((artist) => {
                    return mapToCamelCase(artist)
                })
                track.artists = artists
            }

            console.log(tracks)

            res.status(200).json({tracks})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось получить треки"
            }) 
        }
    }
}

module.exports = new TrackControllers()