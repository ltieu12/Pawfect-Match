const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const aws_sdk = require('aws-sdk');

const app = express();

aws_sdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: 'us-east-1'
})

const lambda = new aws_sdk.Lambda();
const secretsManager = new aws_sdk.SecretsManager(); 

async function getSecretValue() {
    try {
        const data = await secretsManager.getSecretValue({
            SecretId: "test-secret"
        }).promise();
        const secret = JSON.parse(data.SecretString);
        return secret;
    }
    catch(error) {
        console.log("Error fetching DB secret: ", error)
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

function createDogDb(connection) {
    // SQL query to delete an existing table to create a new one
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_drop_table.asp
    let sqlDelete = "DROP TABLE IF EXISTS dogs";
    connection.query(sqlDelete, function (err, result) {
        if (err) {
            console.error('Error deleting existing table:', err.stack);
            return;
        }
        else {
            console.log("Table deleted.");
        }
    });

    // SQL query to create a new table
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_create_table.asp
    let sqlCreate_Dogs = "CREATE TABLE dogs (name VARCHAR(100), breed VARCHAR(100), age INT)";
    connection.query(sqlCreate_Dogs, function (err, result) {
        if (err) {
            console.error('Error creating the table:', err.stack);
            return;
        }
        else {
            console.log("Table created.");
        }
    });

    const dogs = [
        {name: 'Lucky', breed: 'Poodle', age: 1},
        {name: 'Lulu', breed: 'Golden Retriever', age: 3},
        {name: 'Shen', breed: 'French Bulldog', age: 2},
    ];

    dogs.forEach(dog => {
        let sqlInsert = `INSERT INTO dogs (name, breed, age) VALUES ('${dog.name}', '${dog.breed}', '${dog.age}')`;
        connection.query(sqlInsert, function(err, result) {
            if (err) {
                console.error('Error in database query:', err.stack);
                return;
            }
        });
    });
}

function createCatDb(connection) {
    // SQL query to delete an existing table to create a new one
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_drop_table.asp
    let sqlDelete = "DROP TABLE IF EXISTS cats";
    connection.query(sqlDelete, function (err, result) {
        if (err) {
            console.error('Error deleting existing table:', err.stack);
            return;
        }
        else {
            console.log("Table deleted.");
        }
    });

    // SQL query to create a new table
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_create_table.asp
    let sqlCreate_Cats = "CREATE TABLE cats (name VARCHAR(100), breed VARCHAR(100), age INT)";
    connection.query(sqlCreate_Cats, function (err, result) {
        if (err) {
            console.error('Error creating the table:', err.stack);
            return;
        }
        else {
            console.log("Table created.");
        }
    });

    const cats = [
        {name: 'Oreo', breed: 'Tuxedo', age: 5},
        {name: 'Nala', breed: 'Calico', age: 3},
        {name: 'Missy', breed: 'British Shorthair', age: 2},
    ];

    cats.forEach(cat => {
        let sqlInsert = `INSERT INTO cats (name, breed, age) VALUES ('${cat.name}', '${cat.breed}', '${cat.age}')`;
        connection.query(sqlInsert, function(err, result) {
            if (err) {
                console.error('Error in database query:', err.stack);
                return;
            }
        });
    });
}

function createOtherDb(connection) {
    // SQL query to delete an existing table to create a new one
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_drop_table.asp
    let sqlDelete = "DROP TABLE IF EXISTS others";
    connection.query(sqlDelete, function (err, result) {
        if (err) {
            console.error('Error deleting existing table:', err.stack);
            return;
        }
        else {
            console.log("Table deleted.");
        }
    });

    // SQL query to create a new table
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_create_table.asp
    let sqlCreate_Others = "CREATE TABLE others (name VARCHAR(100), breed VARCHAR(100), age INT)";
    connection.query(sqlCreate_Others, function (err, result) {
        if (err) {
            console.error('Error creating the table:', err.stack);
            return;
        }
        else {
            console.log("Table created.");
        }
    });

    const others = [
        {name: 'Randy', breed: 'Hamster', age: 1},
        {name: 'Barrett', breed: 'Parrot', age: 3},
        {name: 'Marlin', breed: 'Goldfish', age: 2},
    ];

    others.forEach(pet => {
        let sqlInsert = `INSERT INTO others (name, breed, age) VALUES ('${pet.name}', '${pet.breed}', '${pet.age}')`;
        connection.query(sqlInsert, function(err, result) {
            if (err) {
                console.error('Error in database query:', err.stack);
                return;
            }
        });
    });
}

async function invokeLambda(firstName, lastName, email) {
    const message = `Hello ${ firstName } ${ lastName }! Thank you for your application. We truly appreciate your kindness towards these babies. We will review the application and get back to you as soon as possible for further details. The process should take about 3-5 business days. Please feel free to contact us at (902)-123-4567 or purfectmatch@gmail.com for any questions.
    Purfect Match team!`
    const params = {
        FunctionName: "sendEmailFunc",
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

app.use(express.json());
app.use(cors());

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

// listen to get request on /list-products
app.get("/dogs", async (req, res) => {
    const connection = await connectDatabase();
    createDogDb(connection);
    // SQL query to retrieve data from the table
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
    let sqlGet = 'SELECT * FROM dogs';
    connection.query(sqlGet, function(err, result) {
        if (err) {
            console.error('Error in database query:', err.stack);
            return;
        }
        else {
            const resultString = {
                // Map the record to an array of products with their associate keys
                // Reference: https://www.w3schools.com/jsref/jsref_map.asp#:~:text=Description,not%20change%20the%20original%20array.
                dogs: result.map(record => ({
                  name: record.name,
                  breed: record.breed,
                  age: record.age
                }))
            };
            res.status(200).json(resultString);
        }
    });
});

// listen to get request on /list-products
app.get("/cats", async (req, res) => {
    const connection = await connectDatabase();
    createCatDb(connection);
    // SQL query to retrieve data from the table
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
    let sqlGet = 'SELECT * FROM cats';
    connection.query(sqlGet, function(err, result) {
        if (err) {
            console.error('Error in database query:', err.stack);
            return;
        }
        else {
            const resultString = {
                // Map the record to an array of products with their associate keys
                // Reference: https://www.w3schools.com/jsref/jsref_map.asp#:~:text=Description,not%20change%20the%20original%20array.
                cats: result.map(record => ({
                    name: record.name,
                    breed: record.breed,
                    age: record.age
                }))
            };
            res.status(200).json(resultString);
        }
    });
});

// listen to get request on /list-products
app.get("/others", async (req, res) => {
    const connection = await connectDatabase();
    createOtherDb(connection);
    // SQL query to retrieve data from the table
    // Reference: https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
    let sqlGet = 'SELECT * FROM others';
    connection.query(sqlGet, function(err, result) {
        if (err) {
            console.error('Error in database query:', err.stack);
            return;
        }
        else {
            const resultString = {
                // Map the record to an array of products with their associate keys
                // Reference: https://www.w3schools.com/jsref/jsref_map.asp#:~:text=Description,not%20change%20the%20original%20array.
                others: result.map(record => ({
                    name: record.name,
                    breed: record.breed,
                    age: record.age
                }))
            };
            res.status(200).json(resultString);
        }
    });
});

const PORT = 8080;
app.listen(PORT);

