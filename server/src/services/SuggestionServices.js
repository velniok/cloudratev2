const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class SuggestionServices {
    async createSuggestionTrack(values, userId) {
        const suggestionTrackRes = await pool.query(`
            INSERT INTO track_suggestions
                (
                    title,
                    cover_url,
                    soundcloud_url,
                    artist_id,
                    feat_artist_ids,
                    release_data,
                    user_id
                )
                SELECT $1, $2, $3, $4, $5, $6, $7
                RETURNING *
        `, [...values, userId])
        return mapToCamelCase(suggestionTrackRes.rows[0])
    }

    async getSuggestionTracks() {
        const suggestionsRes = await pool.query(`
            SELECT
                s.*,
                (
                    SELECT (row_to_json(u)::jsonb - 'password')::json
                    FROM users u
                    WHERE u.id = s.user_id
                ) as user,
                (
                    SELECT row_to_json(a)
                    FROM artists a
                    WHERE a.id = s.artist_id
                ) as artist,
                (
                    SELECT json_agg(row_to_json(a))
                    FROM artists a
                    WHERE a.id = ANY(s.feat_artist_ids) 
                ) as feat_artists,
                (
                    SELECT row_to_json(u)
                    FROM users u
                    WHERE s.reviewed_by = u.id
                ) as reviewed_by_user
            FROM track_suggestions s
        `)
        return suggestionsRes.rows.map(mapToCamelCase)
    }

    async acceptSuggestionTrack(id, adminId) {
        const suggestionsRes = await pool.query(`
            UPDATE track_suggestions
            SET
                status = 'accepted',
                reviewed_by = $2
            WHERE id = $1
            RETURNING *
        `, [id, adminId])
        return mapToCamelCase(suggestionsRes.rows[0])
    }

    async rejectSuggestionTrack(id, adminId) {
        const suggestionsRes = await pool.query(`
            UPDATE track_suggestions
            SET
                status = 'rejected',
                reviewed_by = $2
            WHERE id = $1
            RETURNING *
        `, [id, adminId])
        return mapToCamelCase(suggestionsRes.rows[0])
    }
}

module.exports = new SuggestionServices()