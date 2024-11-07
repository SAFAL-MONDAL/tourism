// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'ACfedd073b906e6ee8c8a3412d44e6bcbc';
const authToken = 'c7ad1bb31db0b098649e833e58a39e49';
const twilioPhoneNumber = '+12515778255';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { message, phoneNumber } = req.body;

    client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber
    })
    .then(() => {
        console.log('SMS sent successfully');
        res.status(200).send('SMS sent successfully');
    })
    .catch((error) => {
        console.error('Error sending SMS:', error);
        res.status(500).send('Failed to send SMS');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
