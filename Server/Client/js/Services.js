const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: proccess.env.DATABASE_USER,
    passwort: process.env.DATABASE_PASSWORT,
    database: process.env.DATABASE,
    port: process.env.PORT
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log("DB: " + connection.state);
});

class Services {
    static getServicesInstance (){
            return instance ? instance : new Services();
    }

    async getData() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query1 = "SELECT * FROM termine;"

                connection.query(query1, (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;

        }catch (err){
            console.log(err);
        }
    }
}

module.exports = Services;