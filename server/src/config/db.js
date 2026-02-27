const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 2000,
    keepAlive: true, 
    keepAliveInitialDelayMillis: 10000,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('DB error:', err);
    } else {
        console.log('DB connected');
        release();
    }
});

module.exports = pool