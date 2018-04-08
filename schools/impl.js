
'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');

const options = {
    user: 'root',
    password: 'Neela567',
    database:'schools'
};

const connection = mysql.createConnection(options);

function search (searchTerm, cb) {
    connection.query(
        "SELECT * FROM schools WHERE instituteName LIKE "+connection.escape('%'+searchTerm+'%'),
        (err, result) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        }
    )
}

function endConnection () {
    console.log(" Ending Connection to DB");
    connection.end();
}

module.exports = {
    search: search,
    endConnection: endConnection
}