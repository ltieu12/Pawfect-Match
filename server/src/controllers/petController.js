const { connectDatabase } = require('../config/dbConfig');
const { initializeTable, executeQuery } = require('../services/dbService');

async function createAndFetchData(tableName, createQuery, data) {
    const connection = await connectDatabase();
    await initializeTable(connection, tableName, createQuery, data);
    const results = await executeQuery(connection, `SELECT * FROM ${tableName}`);
    return results;
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

async function getDogsData(req, res) {
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
}

async function getCatsData(req, res) {
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
}

async function getOtherData(req, res) {
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
}

module.exports = { getDogsData, getCatsData, getOtherData };