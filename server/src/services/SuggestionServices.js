const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class SuggestionServices {
    async createSuggestion(values, userId) {
        const suggestionTrackRes = await pool.query(`
            INSERT INTO track_suggestions
                (
                    title,
                    cover_url,
                    soundcloud_url,
                    artist_id,
                    feat_artist_ids,
                    release_data,
                    temp_artist,
                    temp_feat_artists,
                    user_id
                )
                SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
                RETURNING *
        `, [...values, userId])
        return mapToCamelCase(suggestionTrackRes.rows[0])
    }

    async getSuggestionList() {
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
                COALESCE(
                    (
                        SELECT json_agg(row_to_json(a))
                        FROM artists a
                        WHERE a.id = ANY(s.feat_artist_ids)
                    ),
                    '[]'::json
                ) as feat_artists,
                (
                    SELECT row_to_json(u)
                    FROM users u
                    WHERE s.reviewed_by = u.id
                ) as reviewed_by_user
            FROM track_suggestions s
            ORDER BY s.created_at DESC
        `)
        return suggestionsRes.rows.map(mapToCamelCase)
    }

    async updateSuggestionArtist(id, artistId) {
        await pool.query(`
            UPDATE track_suggestions
            SET artist_id = $2
            WHERE id = $1
            RETURNING *
        `, [id, artistId])
    }

    async updateSuggestionFeat(id, artistId, tempId) {
        await pool.query(`
            UPDATE track_suggestions
            SET
                feat_artist_ids = array_append(feat_artist_ids, $2),
                temp_feat_artists = (
                    SELECT array_agg(elem)
                    FROM unnest(temp_feat_artists) AS elem
                    WHERE elem->>'id' != $3::text
                )
            WHERE id = $1
            RETURNING *
        `, [id, artistId, tempId])
    }

    async acceptSuggestion(id, adminId, trackId) {
        const suggestionsRes = await pool.query(`
            WITH updated AS (
                UPDATE track_suggestions
                SET
                    status = 'accepted',
                    reviewed_by = $2,
                    reviewed_at = NOW(),
                    track_id = $3
                WHERE id = $1
                RETURNING *
            )
            SELECT
                u.*,
                (
                    SELECT (row_to_json(admin)::jsonb - 'password')::json
                    FROM users admin
                    WHERE admin.id = u.reviewed_by
                ) AS reviewed_by_user
            FROM updated u
        `, [id, adminId, trackId])
        return mapToCamelCase(suggestionsRes.rows[0])
    }

    async rejectSuggestion(id, adminId, rejectReason) {
        const suggestionsRes = await pool.query(`
            WITH updated AS (
                UPDATE track_suggestions
                SET
                    status = 'rejected',
                    reviewed_by = $2,
                    reviewed_at = NOW(),
                    reject_reason = $3
                WHERE id = $1
                RETURNING *
            )
            SELECT
                u.*,
                (
                    SELECT (row_to_json(admin)::jsonb - 'password')::json
                    FROM users admin
                    WHERE admin.id = u.reviewed_by
                ) AS reviewed_by_user
            FROM updated u
        `, [id, adminId, rejectReason])
        return mapToCamelCase(suggestionsRes.rows[0])
    }

    async getSuggestionsByUser(userId, status, page, limit) {
        const offset = (+page - 1) * +limit
        if (status === 'all') status = null
        const [suggestionsRes, countRes] = await Promise.all([
            await pool.query(`
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
                WHERE user_id = $1 AND ($2::text IS NULL OR status = $2)
                ORDER BY s.created_at DESC
                LIMIT $3
                OFFSET $4
            `, [userId, status, limit, offset]),
            pool.query(`
                SELECT COUNT(*)::int AS total
                FROM track_suggestions s
                WHERE s.user_id = $1 AND ($2::text IS NULL OR status = $2)
            `, [userId, status])
        ])
        return {
            suggestions: suggestionsRes.rows.map(mapToCamelCase),
            total: countRes.rows[0].total,
        }
    }
}

module.exports = new SuggestionServices()