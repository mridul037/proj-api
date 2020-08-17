const mysql = require('mysql');


const pool=mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"test",
    connectionLimit: 10,
})

const getQuery = (query:any, params = null) => {
    return new Promise((resolve, reject) => {

        if(params === null) {
            pool.query(query, (err:any, results:any) => {
                if(err) reject(err);
        
                resolve(results);
            });
        }

        else {
            pool.query(query, params, (err:any, results:any) => {
                if(err) reject(err);

                resolve(results);
            });
        }
    });
}

module.exports = {
    getQuery
}
