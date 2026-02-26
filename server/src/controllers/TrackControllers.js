const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class TrackControllers {
    async create(req, res) {
        try {
            const { title, coverUrl, artistIds } = req.body

            const newTrackRes = await pool.query('INSERT INTO tracks (title, cover_url, artist_ids) VALUES ($1, $2, $3) RETURNING *', [title, coverUrl, artistIds])
            const track = mapToCamelCase(newTrackRes.rows[0])

            const artistsRes = await pool.query('SELECT * FROM artists WHERE id = ANY($1)', [artistIds]);
            const artists = artistsRes.rows.map(mapToCamelCase);
            track.artists = artists

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

            const allArtistIds = [...new Set(tracks.flatMap(track => track.artistIds))];

            const artistsRes = await pool.query('SELECT * FROM artists WHERE id = ANY($1)', [allArtistIds]);
            const artists = artistsRes.rows.map(mapToCamelCase);

            const result = tracks.map(track => ({
                ...track,
                artists: artists.filter(artist => track.artistIds.includes(artist.id))
            }));

            res.status(200).json({tracks: result})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось получить треки"
            }) 
        }
    }

    async delete(req, res) {
        try {
            const trackId = req.params.id

            await pool.query('DELETE FROM tracks WHERE id = $1', [trackId])

            res.status(200).json({
                message: 'Трек успешно удален'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Не удалось удалить трек"
            }) 
        }
    }
}

module.exports = new TrackControllers()