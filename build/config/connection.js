"use strict";
var mysql = require('mysql');
var pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    connectionLimit: 10,
});
var getQuery = function (query, params) {
    if (params === void 0) { params = null; }
    return new Promise(function (resolve, reject) {
        if (params === null) {
            pool.query(query, function (err, results) {
                if (err)
                    reject(err);
                resolve(results);
            });
        }
        else {
            pool.query(query, params, function (err, results) {
                if (err)
                    reject(err);
                resolve(results);
            });
        }
    });
};
module.exports = {
    getQuery: getQuery
};
