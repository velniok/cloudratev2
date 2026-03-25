const { Pool } = require('pg');
const pg = require('pg');
require('dotenv').config();

const isDev = process.env.IS_DEV === 'dev'

pg.types.setTypeParser(1082, val => val)

const pool = new Pool(
    isDev
    ? {
        user: 'postgres',
        password: '',
        host: 'localhost',
        port: 5432,
        database: 'cloudratev2'
    }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 2,
        idleTimeoutMillis: 5000,
        connectionTimeoutMillis: 10000,
    }
);

pool.connect((err, client, release) => {
    if (err) {
        console.error('DB error:', err);
    } else {
        console.log('DB connected');
        release();
    }
});

module.exports = pool