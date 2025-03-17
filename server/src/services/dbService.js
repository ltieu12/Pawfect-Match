const { connectDatabase } = require('../config/dbConfig');

function executeQuery(connection, query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                console.error('Error executing query: ', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

async function initializeTable(connection, tableName, createQuery, data) {
    const dropQuery = `DROP TABLE IF EXISTS ${tableName}`;
    await executeQuery(connection, dropQuery);
    await executeQuery(connection, createQuery);

    const insertQueries = data.map(pet => 
        `INSERT INTO ${tableName} (name, breed, age, imageSource) VALUES ('${pet.name}', '${pet.breed}', '${pet.age}', '${pet.imageSource}')`
    );

    for (const query of insertQueries) {
        await executeQuery(connection, query);
    }
}

module.exports = { executeQuery, initializeTable };