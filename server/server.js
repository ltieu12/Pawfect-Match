const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const aws_sdk = require('aws-sdk');

const app = express();
app.use(express.json());
app.use(cors());

aws_sdk.config.update({
    region: 'us-east-1'
})

const lambda = new aws_sdk.Lambda();
const secretsManager = new aws_sdk.SecretsManager(); 

async function getSecretValue() {
    try {
        const data = await secretsManager.getSecretValue({
            SecretId: "db_secret"
        }).promise();
        const secret = JSON.parse(data.SecretString);
        return secret;
    }
    catch(error) {
        console.log("Error fetching DB secret: ", error)
    }
}

// async function connectDatabase() {
//     const dbSecret = await getSecretValue();
//     console.log(dbSecret);
//     return mysql.createConnection({
//         host: dbSecret.host,
//         port: dbSecret.port,
//         user: dbSecret.username,
//         password: dbSecret.password,
//         database: dbSecret.dbname
//     });
// }

async function connectDatabase() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: "Lam01122002@",
        database: "project_db"
    });
}

const dogTableQuery = "CREATE TABLE dogs (name VARCHAR(100), breed VARCHAR(100), age INT, imageSource VARCHAR(100))";
const dogData = [
    { name: 'Lucky', breed: 'Poodle', age: 1, imageSource: '/dogImages/poodle.jpg' },
    { name: 'Lulu', breed: 'Golden Retriever', age: 3, imageSource: '/dogImages/golden.jpg' },
    { name: 'Shen', breed: 'French Bulldog', age: 2, imageSource: '/dogImages/French-Bulldog.jpg' },
];

const catTableQuery = "CREATE TABLE cats (name VARCHAR(100), breed VARCHAR(100), age INT, imageSource VARCHAR(100))";
const catData = [
    { name: 'Oreo', breed: 'Tuxedo', age: 5, imageSource: '/catImages/tuxedo.jpg' },
    { name: 'Nala', breed: 'Calico', age: 3, imageSource: '/catImages/A_Calico_cat.jpg' },
    { name: 'Missy', breed: 'British Shorthair', age: 2, imageSource: '/catImages/British Shorthair.jpg' },
];

const otherTableQuery = "CREATE TABLE others (name VARCHAR(100), breed VARCHAR(100), age INT, imageSource VARCHAR(100))";
const otherData = [
    { name: 'Randy', breed: 'Hamster', age: 1, imageSource: '/otherImages/hamster.png' },
    { name: 'Barrett', breed: 'Parrot', age: 3, imageSource: '/otherImages/parrot.jpg' },
    { name: 'Marlin', breed: 'Goldfish', age: 2, imageSource: '/otherImages/goldfish.jpg' },
];

const executeQuery = (connection, query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

async function initializeDatabase(connection, tableName, createQuery, data) {
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

async function createAndFetchData(tableName, createQuery, data) {
    const connection = await connectDatabase();
    await initializeDatabase(connection, tableName, createQuery, data);
    const results = await executeQuery(connection, `SELECT * FROM ${tableName}`);
    return results;
}

async function invokeLambda(firstName, lastName, email) {
    const message = `Hello ${ firstName } ${ lastName }! Thank you for your application. We truly appreciate your kindness towards these babies. We will review the application and get back to you as soon as possible for further details. The process should take about 3-5 business days. Please feel free to contact us at (902)-123-4567 or purfectmatch@gmail.com for any questions.
    Purfect Match team!`
    const params = {
        FunctionName: "InvokeSNS",
        Payload: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        })
    };

    try {
        const data = await lambda.invoke(params).promise();
        console.log(data.Payload);
        return JSON.parse(data.Payload);
    }
    catch(error) {
        console.log(error);
        throw new Error('Error invoking Lambda function');
    }
}

// listen to post request on /store-products
app.post("/adoption", async (req, res) => {
    const input = req.body;
    const firstName = input.firstName;
    const lastName = input.lastName;
    const email = input.email;

    try {
        const lambdaResponse = await invokeLambda(firstName, lastName, email);
        res.status(200).json(lambdaResponse);
    }
    catch(error) {
        console.error('Error calling Lambda function:', error);
        res.json({
            status: 500,
            lambdaError: error
        });
    }
}); 

app.get("/dogs", async (req, res) => {
    try {
        const data = await createAndFetchData("dogs", dogTableQuery, dogData);
        const resultString = {
            dogs: data.map(dog => ({
                name: dog.name,
                breed: dog.breed,
                age: dog.age,
                imageSource: dog.imageSource
            }))
        };
        res.status(200).json(resultString);
    }
    catch(error) {
        console.error("Error fetching dogs", error);
    }
});

app.get("/cats", async (req, res) => {
    try {
        const data = await createAndFetchData("cats", catTableQuery, catData);
        const resultString = {
            cats: data.map(cat => ({
                name: cat.name,
                breed: cat.breed,
                age: cat.age,
                imageSource: cat.imageSource
            }))
        };
        res.status(200).json(resultString);
    }
    catch(error) {
        console.error("Error fetching cats", error);
    }
});

app.get("/others", async (req, res) => {
    try {
        const data = await createAndFetchData("others", otherTableQuery, otherData);
        const resultString = {
            others: data.map(pet => ({
                name: pet.name,
                breed: pet.breed,
                age: pet.age,
                imageSource: pet.imageSource
            }))
        };
        res.status(200).json(resultString);
    }
    catch(error) {
        console.error("Error fetching pets", error);
    }
});

const PORT = 8080;
app.listen(PORT);

