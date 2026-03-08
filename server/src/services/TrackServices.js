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

    async getTracksPagination(page, limit) {
        const offset = (+page - 1) * +limit
        const [tracksRes, countRes] = await Promise.all([
            pool.query(`
                SELECT
                    t.*,
                    (
                        SELECT ROUND(AVG(r.rating)::numeric)
                        FROM reviews r
                        WHERE r.track_id = t.id
                    ) as avg_rating,
                    (
                        SELECT json_agg(row_to_json(a))
                        FROM artists a
                        WHERE a.id = ANY(t.artist_ids)
                    ) as artists
                FROM tracks t
                ORDER BY id
                LIMIT $1
                OFFSET $2
            `, [limit, offset]),
            pool.query(`
                SELECT COUNT(*) AS total FROM tracks
            `)
        ])
        return {
            tracks: tracksRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total
        }
    }

    async getTrackById(id) {
        const trackRes = await pool.query(`
            SELECT
                t.*,
                (
                    SELECT ROUND(AVG(r.rating)::numeric)
                    FROM reviews r
                    WHERE r.track_id = t.id
                ) as avg_rating,
                (
                    SELECT json_build_object(
                        'criteria1', ROUND(AVG(r.criteria1)::numeric, 1),
                        'criteria2', ROUND(AVG(r.criteria2)::numeric, 1),
                        'criteria3', ROUND(AVG(r.criteria3)::numeric, 1),
                        'criteria4', ROUND(AVG(r.criteria4)::numeric, 1),
                        'criteria5', ROUND(AVG(r.criteria5)::numeric, 1)
                    )
                    FROM reviews r
                    WHERE r.track_id = t.id
                ) as avg_criterias,
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

    async updateTrackById(id, values) {
        const trackRes = await pool.query(`
            UPDATE tracks
            SET
                title = $1,
                cover_url = $2
            WHERE id = $3
            RETURNING *
        `, [...values, id])
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