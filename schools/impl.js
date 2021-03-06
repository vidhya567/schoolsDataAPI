
'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');

const options = {
    user: 'root',
    password: 'neela567',
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

function getSchoolDataFromSchoolId (schoolId, cb) {
    connection.query(
        "SELECT * FROM schools WHERE schoolID = "+schoolId,
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
    getSchoolDataFromSchoolId: getSchoolDataFromSchoolId,
    endConnection: endConnection
}