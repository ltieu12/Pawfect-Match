const { lambda } = require('../config/awsConfig');

async function invokeLambda(firstName, lastName, email) {
    const message = `Hello ${ firstName } ${ lastName }! Thank you for your application. We truly appreciate your kindness towards these babies. We will review the application and get back to you as soon as possible for further details. The process should take about 3-5 business days. Please feel free to contact us at (902)-123-4567 or pawfectmatch@gmail.com for any questions.

    
        Pawfect Match team!`
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

module.exports = { invokeLambda };