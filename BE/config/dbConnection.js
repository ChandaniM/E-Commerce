const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting to the database:", err.stack);
    return;
  }
  console.log("connected to the database as id " + connection.threadId);
});

module.exports = connection;

/**
 * 
 * const mysql = require("mysql2/promise");
require("dotenv").config();
let connection;
const connectDB = async () => {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  connection
    .connect()
    .then(() => {
      return connection;
    })
    .catch((err) => {
      console.error("error connecting to the database:", err.stack);
      return false;
    });
};

const asynctrycatch = async (promise) => {};
const closeConnection = async (connect) => {
  connect.end();
};

module.exports = connectDB;

 * 
 * */
