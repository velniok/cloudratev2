const pool = require("../config/db")
const mapToCamelCase = require("../utils/toCamelCase")

class SearchServices {
    async searchByNameAndFilter(search, filter, userId) {
        const queries = {
            tracks:
                `SELECT
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
                    ) as artist
                FROM tracks t
                WHERE
                    REPLACE(LOWER(title), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')
                ORDER BY id`,
            artists:
                `SELECT
                    a.*,
                    (
                        SELECT json_build_object(
                                'followers_count', COUNT (*)::int,
                                'is_followed', EXISTS (
                                    SELECT 1 FROM artist_follows
                                    WHERE artist_id = a.id AND user_id = $2
                                )
                            )
                        FROM artist_follows
                        WHERE artist_id = a.id
                    ) as follow
                FROM artists a
                WHERE
                    REPLACE(LOWER(name), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')`,
            users:
                `SELECT *
                FROM users
                WHERE
                    REPLACE(LOWER(nickname), 'ё', 'е')
                ILIKE
                    REPLACE(LOWER($1), 'ё', 'е')`, 
        }
        const query = queries[filter]
        const params = filter === 'artists'
        ? [`%${search}%`, userId]
        : [`%${search}%`]
        const resultRes = await pool.query(query, params)
        return resultRes.rows.map(mapToCamelCase)
    }
}

module.exports = new SearchServices()