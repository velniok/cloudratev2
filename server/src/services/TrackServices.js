const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class TrackServices {

    async createTrack(values) {
        const newTrackRes = await pool.query(`
            WITH
                track_check AS (
                    SELECT id
                    FROM tracks t
                    WHERE title = $1
                ),
                inserted AS (
                    INSERT INTO tracks
                    (
                        title,
                        cover_url,
                        soundcloud_url,
                        artist_id,
                        feat_artist_ids,
                        release_data
                    )
                    SELECT $1, $2, $3, $4, $5, $6
                    WHERE NOT EXISTS (SELECT 1 FROM track_check)
                    RETURNING *
                )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM track_check)
                THEN 'track_taken'
                ELSE 'ok' END as status,
                (
                    SELECT row_to_json(t) FROM (
                        SELECT
                            i.*,
                            (
                                SELECT row_to_json(a)
                                FROM artists a
                                WHERE a.id = i.artist_id
                            ) as artist
                        FROM inserted i
                    ) t
                ) as track
        `, values)
        return mapToCamelCase(newTrackRes.rows[0])
    }

    async getTrackList(page, limit) {
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
                        SELECT row_to_json(a)
                        FROM artists a
                        WHERE a.id = t.artist_id
                    ) as artist,
                    (
                        SELECT json_agg(row_to_json(a))
                        FROM artists a
                        WHERE a.id = ANY(t.feat_artist_ids)
                    ) as feat_artists
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

    async getTracksByArtist(page, limit, artistId) {
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
                        SELECT row_to_json(a)
                        FROM artists a
                        WHERE a.id = t.artist_id
                    ) as artist,
                    (
                        SELECT json_agg(row_to_json(a))
                        FROM artists a
                        WHERE a.id = ANY(t.feat_artist_ids)
                    ) as feat_artists,
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
                    ) as avg_criterias
                FROM tracks t
                WHERE $3 = t.artist_id OR $3 = ANY(t.feat_artist_ids)
                ORDER BY t.release_data DESC
                LIMIT $1
                OFFSET $2
            `, [limit, offset, artistId]),
            pool.query(`
                SELECT COUNT(*) AS total FROM tracks t WHERE $1 = t.artist_id OR $1 = ANY(t.feat_artist_ids)
            `, [artistId])
        ])
        return {
            tracks: tracksRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total
        }
    } 
    
    async getNewTracks() {
        const tracksRes = await pool.query(`
            SELECT
                t.*,
                (
                    SELECT ROUND(AVG(r.rating)::numeric)
                    FROM reviews r
                    WHERE r.track_id = t.id
                ) as avg_rating,
                (
                    SELECT row_to_json(a)
                    FROM artists a
                    WHERE a.id = t.artist_id
                ) as artist,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(t.feat_artist_ids)
                ) as feat_artists
            FROM tracks t
            ORDER BY t.release_data DESC
            LIMIT 15
        `)
        return tracksRes.rows.map(mapToCamelCase)
    }

    async getTrack(trackId, userId) {
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
                    SELECT row_to_json(a)
                    FROM artists a
                    WHERE a.id = t.artist_id
                ) as artist,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(t.feat_artist_ids)
                ) as feat_artists,
                (
                    SELECT COUNT(*)::int
                    FROM reviews r
                    WHERE r.track_id = t.id
                ) as reviews_count,
                (
                    SELECT row_to_json(r)
                    FROM reviews r
                    WHERE r.track_id = $1 AND r.user_id = $2
                ) as user_review
            FROM tracks t
            WHERE id = $1
        `, [trackId, userId])
        return mapToCamelCase(trackRes.rows[0])
    }

    async updateTrack(id, values) {
        const trackRes = await pool.query(`
            WITH
                track_check AS (
                    SELECT id
                    FROM tracks t
                    WHERE title = $1 AND id != $5
                ),
                updated as (
                    UPDATE tracks
                    SET
                        title = $1,
                        cover_url = $2,
                        soundcloud_url = $3,
                        release_data = $4
                    WHERE id = $5 AND NOT EXISTS (SELECT 1 FROM track_check)
                    RETURNING *
                )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM track_check)
                THEN 'track_taken'
                ELSE 'ok' END as status,
                (
                    SELECT row_to_json(t)
                    FROM updated t
                ) as track
        `, [...values, id])
        return mapToCamelCase(trackRes.rows[0])
    }

    async deleteTrack(id) {
        await pool.query(`
            DELETE
            FROM tracks
            WHERE id = $1
        `, [id])
    }
}

module.exports = new TrackServices()