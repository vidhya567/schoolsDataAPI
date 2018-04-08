'use strict';

const path = require('path');
const express = require('express');
const intendedPort = 8900;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/schools', require('./schools/api'));

app.get('/', (req, res) => {
   console.log("GET");
   res.redirect('/schools');
});

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.response || 'Something Wrong in Call to Schools API');
});

if (module === require.main) {
    // Start the server
    const server = app.listen(intendedPort, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    });
}

module.exports = app;