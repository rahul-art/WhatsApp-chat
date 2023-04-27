const express = require('express');
const twilio = require('twilio');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = new twilio(accountSid, authToken);

app.post('/incoming', (req, res) => {
    const message = req.body.Body;
    const fromNumber = req.body.From;

    // Send an automatic reply
    const replyMessage = `You said: ${message}`;
    client.messages.create({
        from: '+16076257472',
        to: fromNumber,
        body: replyMessage
    })
        .then(message => console.log(message.sid))
        .catch(error => console.log(error));

    res.send();
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
