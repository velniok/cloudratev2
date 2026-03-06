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

    async getArtistsPagination(limit, page) {
        const offset = (+page - 1) * +limit
        const artistsRes = await pool.query(`
            SELECT
                a.*,
                (
                    SELECT json_agg(row_to_json(t))
                    FROM tracks t
                    WHERE a.id = ANY(t.artist_ids)
                ) as tracks,
                (
                    SELECT ROUND(AVG(r.rating)::numeric)
                    FROM reviews r, tracks t
                    WHERE r.track_id = t.id AND a.id = ANY(t.artist_ids)
                ) as avg_rating
            FROM artists a
            ORDER BY id
            LIMIT $1
            OFFSET $2
        `, [limit, offset])
        return artistsRes.rows.map(mapToCamelCase)
    }

    async getArtistById(id) {
        const artistRes = await pool.query(`
            SELECT
                a.*,
                (
                    SELECT json_agg(
                        jsonb_build_object('artists', (
                            SELECT json_agg(row_to_json(ar))
                            FROM artists ar
                            WHERE ar.id = ANY(t.artist_ids)
                        ),
                        'avg_rating', (
                            SELECT ROUND(AVG(r.rating)::numeric)
                            FROM reviews r
                            WHERE r.track_id = t.id
                        )
                        ) || row_to_json(t)::jsonb
                    )
                    FROM tracks t
                    WHERE $1 = ANY(t.artist_ids)
                ) as tracks
            FROM artists a
            WHERE a.id = $1
        `, [id]);
        return mapToCamelCase(artistRes.rows[0]);
    }

    async updateArtistById(id, values) {
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

    async searchArtistsByName(search) {
        const artistsRes = await pool.query(`
            SELECT *
            FROM artists
            WHERE
                REPLACE(LOWER(name), 'ё', 'е')
            ILIKE
                REPLACE(LOWER($1), 'ё', 'е')
        `, [`%${search}%`])
        return artistsRes.rows.map(mapToCamelCase)
    }

    async deleteArtistById(id) {
        await pool.query(`
            DELETE
            FROM artists
            WHERE id = $1
        `, [id])
    }
}

module.exports = new ArtistServices()