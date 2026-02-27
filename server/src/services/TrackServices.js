const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class TrackServices {

    async createTrack(values) {
        const newTrackRes = await pool.query(`
            WITH inserted AS (
                INSERT INTO tracks (title, cover_url, artist_ids)
                VALUES ($1, $2, $3)
                RETURNING *
            )
            SELECT
                i.*,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(i.artist_ids)
                ) as artists
            FROM inserted i
        `, values)
        return mapToCamelCase(newTrackRes.rows[0])
    }

    async getAllTracks() {
        const tracksRes = await pool.query(`
            SELECT
                t.*,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(t.artist_ids)
                ) as artists
            FROM tracks t
        `)
        return tracksRes.rows.map(mapToCamelCase)
    }

    async getTrackById(id) {
        const trackRes = await pool.query(`
            SELECT
                t.*,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(t.artist_ids)
                ) as artists
            FROM tracks t
            WHERE id = $1
        `, [id])
        return mapToCamelCase(trackRes.rows[0])
    }

    async deleteTrackById(id) {
        await pool.query(`
            DELETE
            FROM tracks
            WHERE id = $1
        `, [id])
    }
}

module.exports = new TrackServices()