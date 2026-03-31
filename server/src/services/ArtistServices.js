const pool = require("../config/db");
const mapToCamelCase = require("../utils/toCamelCase");

class ArtistServices {

    async createArtist(values) {
        const newArtistRes = await pool.query(`
            WITH 
                artist_check AS (
                    SELECT id
                    FROM artists
                    WHERE name = $1
                ),
                inserted AS (
                    INSERT INTO artists
                    (
                        name,
                        soundcloud_url,
                        avatar_url
                    )
                    SELECT $1, $2, $3
                    WHERE NOT EXISTS (SELECT 1 FROM artist_check)
                    RETURNING *
                )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM artist_check)
                THEN 'artist_taken'
                ELSE 'ok' END as status,
                (
                    SELECT row_to_json(a)
                    FROM inserted a
                ) as artist
        `, values)
        return mapToCamelCase(newArtistRes.rows[0])
    }

    async getArtistList(limit, page) {
        const offset = (+page - 1) * +limit
        const [artistsRes, countRes] = await Promise.all([
            pool.query(`
                SELECT
                    a.*,
                    (
                        SELECT COUNT(*)::int
                        FROM tracks t
                        WHERE a.id = ANY(t.feat_artist_ids) OR a.id = t.artist_id
                    ) as tracks_count,
                    (
                        SELECT ROUND(AVG(r.rating)::numeric)
                        FROM reviews r, tracks t
                        WHERE r.track_id = t.id AND (a.id = ANY(t.feat_artist_ids) OR a.id = t.artist_id)
                    ) as avg_rating
                FROM artists a
                ORDER BY id
                LIMIT $1
                OFFSET $2
            `, [limit, offset]),
            pool.query(`SELECT COUNT(*) AS total FROM artists`)
        ])
        return {
            artists: artistsRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
    }

    async getArtist(id, userId) {
            const [artistRes, followRes] = await Promise.all([
                pool.query(`
                    WITH artist_top_tracks AS (
                        SELECT
                            t.*,
                            (
                                SELECT ROUND(AVG(r.rating)::numeric)
                                FROM reviews r
                                WHERE r.track_id = t.id
                            ) as avg_rating,
                            (
                                SELECT row_to_json(ar)
                                FROM artists ar
                                WHERE ar.id = t.artist_id
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
                        WHERE $1 = t.artist_id OR $1 = ANY(t.feat_artist_ids)
                        ORDER BY avg_rating DESC NULLS LAST
                        LIMIT 15
                    )
                    SELECT
                        a.*,
                        (
                            SELECT ROUND(AVG(r.rating)::numeric)
                            FROM reviews r
                            JOIN tracks t ON t.id = r.track_id
                            WHERE $1 = t.artist_id OR $1 = ANY(t.feat_artist_ids)
                        ) as avg_rating,
                        (
                            SELECT json_agg(row_to_json(at))
                            FROM artist_top_tracks at
                        ) as top_tracks
                    FROM artists a
                    WHERE a.id = $1
                `, [id]),
                pool.query(`
                    SELECT
                        COUNT (*)::int as followers_count,
                        EXISTS (
                            SELECT 1 FROM artist_follows
                            WHERE artist_id = $1 AND user_id = $2
                        ) as is_followed
                    FROM artist_follows
                    WHERE artist_id = $1
                `, [id, userId])
            ])
            return {
                artist: mapToCamelCase(artistRes.rows[0]),
                follow: mapToCamelCase(followRes.rows[0])
            }
    }

    async updateArtist(id, values) {
        const artistRes = await pool.query(`
            WITH
                artist_check AS (
                    SELECT id
                    FROM artists a
                    WHERE name = $1 AND a.id != $4
                ),
                updated AS (
                    UPDATE artists 
                    SET
                        name = $1,
                        avatar_url = $2,
                        soundcloud_url = $3
                    WHERE id = $4 AND NOT EXISTS (SELECT 1 FROM artist_check)
                    RETURNING *
                )
            SELECT
                CASE WHEN EXISTS (SELECT 1 FROM artist_check)
                THEN 'artist_taken'
                ELSE 'ok' END as status,
                (
                    SELECT row_to_json(a)
                    FROM updated a
                ) as artist
        `, [...values, id])
        return mapToCamelCase(artistRes.rows[0])
    }

    async getArtistsByUser(page, limit, userId) {
        const offset = (+page - 1) * +limit
        const [artistsRes, countRes] = await Promise.all([
            pool.query(`
                SELECT *
                FROM artists a
                JOIN artist_follows af ON af.artist_id = a.id
                WHERE af.user_id = $3
                LIMIT $1
                OFFSET $2
            `, [limit, offset, userId]),
            pool.query(`
                SELECT COUNT(*)::int AS total
                FROM artists a
                JOIN artist_follows af ON af.artist_id = a.id
                WHERE af.user_id = $1
            `, [userId])
        ])
        return {
            artists: artistsRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
    }

    async toggleFollow(artistId, userId) {
        return await pool.query(`
            WITH deleted AS (
                DELETE FROM artist_follows
                WHERE artist_id = $1 AND user_id = $2
                RETURNING id
            )
            INSERT INTO artist_follows (artist_id, user_id)
            SELECT $1, $2
            WHERE NOT EXISTS (SELECT 1 FROM deleted)
            RETURNING id
        `, [artistId, userId])
    }

    async deleteArtist(id) {
        await pool.query(`
            DELETE
            FROM artists
            WHERE id = $1
        `, [id])
    }
}

module.exports = new ArtistServices()