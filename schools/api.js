'use strict';

const express = require('express');
const bodyParser = require('body-parser');



const router = express.Router();
const dbImpl = require('./impl');

// Automatically parse request body as JSON
router.use(bodyParser.json());

router.get('/search', (req, res, next) => {
    const searchTerm = req.query.searchTerm;
    console.log("Searching for ",searchTerm);
    dbImpl.search(searchTerm, (err, result) => {
        if (err) {
            next(err);
        }
        res.json(result);
    });
});

router.use((err, req, res, next) => {
    err.response = {
        message: err.message,
        internalCode: err.code
    }
    next(err);
});

module.exports = router;