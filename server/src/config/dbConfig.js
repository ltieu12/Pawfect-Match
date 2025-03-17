const mysql = require('mysql2');
const { secretsManager } = require('./awsConfig');

async function getSecretValue() {
    try {
        const data = await secretsManager.getSecretValue({
            SecretId: "db_secret"
        }).promise();
        const secret = JSON.parse(data.SecretString);
        return secret;
    }
    catch(error) {
        console.error("Error fetching DB secret: ", error);
    }
}

async function connectDatabase() {
    const dbSecret = await getSecretValue();
    return mysql.createConnection({
        host: dbSecret.host,
        port: dbSecret.port,
        user: dbSecret.username,
        password: dbSecret.password,
        database: dbSecret.dbname
    });
}

module.exports = { connectDatabase };