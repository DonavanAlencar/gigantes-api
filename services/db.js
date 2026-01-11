const mysql = require('mysql2/promise');
const config = require('../config');

let pool;

const getPool = () => {
    if (!pool) {
        pool = mysql.createPool({
            host: config.db.host,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
};

const checkHealth = async () => {
    try {
        const connection = await getPool().getConnection();
        await connection.query('SELECT 1');
        connection.release();
        return true;
    } catch (error) {
        console.error('MySQL Health Check Failed:', error.message);
        return false;
    }
};

module.exports = {
    getPool,
    checkHealth,
};
