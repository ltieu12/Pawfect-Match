const aws_sdk = require('aws-sdk');
const sns = new aws_sdk.SNS();

exports.handler = async (event) => {
    const message = event.message;
    const params = {
        Message: message,
        Subject: "Confirmation of Application",
        TopicArn: process.env.SNS_TOPIC_ARN
    }

    console.log(params);

    try {
        const data = await sns.publish(params).promise();
        console.log(`Message sent successfully!`);
    }
    catch(error) {
        return {
            status: 500,
            error: error.message
        }
    }
}