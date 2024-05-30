// Load environment variables from .env file
require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

// Build the path to the schema SQL file
const schema = path.join(__dirname, "database", "schema.sql");

// Get database connection details from .env file
const { MYSQLHOST, MYSQLPASSWORD, MYSQLPORT, MYSQLDATABASE, MYSQLUSER } =
  process.env;

// Update the database schema
const mysql = require("mysql2/promise");

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: MYSQLHOST,
      port: MYSQLPORT,
      user: MYSQLUSER,
      password: MYSQLPASSWORD, // Replace with your password or use environment variable
      database: MYSQLDATABASE,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Drop the existing database if it exists
    await database.query(`drop database if exists ${MYSQLDATABASE}`);

    // Create a new database with the specified name
    await database.query(`create database ${MYSQLDATABASE}`);

    // Switch to the newly created database
    await database.query(`use ${MYSQLDATABASE}`);

    // Execute the SQL statements to update the database schema
    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${MYSQLDATABASE} updated from ${schema} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

// Run the migration function
migrate();
