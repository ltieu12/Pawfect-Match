const aws_sdk = require('aws-sdk');

aws_sdk.config.update({
    region: 'us-east-1'
})

const lambda = new aws_sdk.Lambda();
const secretsManager = new aws_sdk.SecretsManager(); 

module.exports = { lambda, secretsManager };