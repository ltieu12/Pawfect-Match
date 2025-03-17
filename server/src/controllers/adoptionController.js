const { invokeLambda } = require('../services/lambdaService');

async function handleAdoption(req, res) {
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
}

module.exports = { handleAdoption };