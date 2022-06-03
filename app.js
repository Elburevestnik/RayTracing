const express = require('express');

const port = 3001;
const applicationPath = __dirname + '/app';

const requestListener = (request, response) => {
    response.sendFile(applicationPath + '/index.html');
};

const app = express();

app.use(express.static(applicationPath))

app.get('/', requestListener);

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }

    console.log('Success start');
});

module.exports = port; 
module.exports = applicationPath; 