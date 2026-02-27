const pool = require("../config/db");
const mapToCamelCase = require("../utils/toCamelCase");

class ArtistServices {

    async createArtist(values) {
        const newArtistRes = await pool.query(`
            INSERT INTO artists (name, soundcloud_url, avatar_url)
            VALUES ($1, $2, $3)
            RETURNING *
        `, values)
        return mapToCamelCase(newArtistRes.rows[0])
    }

    async getAllArtists() {
        const artistsRes = await pool.query(`
            SELECT *
            FROM artists
            ORDER BY id
        `)
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
                        )) || row_to_json(t)::jsonb
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
            UPDATE artists 
            SET
                name = $1,
                avatar_url = $2,
                soundcloud_url = $3
            WHERE id = $4
            RETURNING *
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