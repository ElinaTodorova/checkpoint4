// Get variables from .env file for database connection
const { MYSQLDATABASE, MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD } =
  process.env;

// Create a connection pool to the database
const mysql = require("mysql2/promise");

const client = mysql.createPool({
  host: MYSQLHOST,
  port: MYSQLPORT,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
});

// Try to get a connection to the database
client
  .getConnection()
  .then((connection) => {
    console.info(`Using database ${MYSQLDATABASE}`);

    connection.release();
  })
  .catch((error) => {
    console.warn(
      "Warning:",
      "Failed to establish a database connection.",
      "Please check your database credentials in the .env file if you need a database access."
    );
    console.error("Error message:", error.message);
  });

// Store database name into client for further uses
client.databaseName = MYSQLDATABASE;

// Ready to export
module.exports = client;
