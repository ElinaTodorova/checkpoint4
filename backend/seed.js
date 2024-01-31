/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data
    await database.query("delete from gift");
    queries.push(
      database.query(`INSERT INTO gift (name_gift, description_gift, age_min, image_url) 
      VALUES
      ('Barbie Doll', 
      'A beautiful Barbie doll with blonde hair and blue eyes, dressed in an elegant pink gown. It''s the perfect gift for little girls who enjoy playing with dolls.', 
      3, 'images/barbie.jpg'),
      ('Raffi Stacking Tower',
      'Composed of four rings with various textures, the Raffi Stacking Tower from Done by Deer will be the ideal toy to stimulate your little one''s senses. They will love examining and manipulating each ring before attempting to reconstruct Raffi.', 
      0, 'images/babyToy.jpg')`)
    );

    await database.query("delete from activity");
    queries.push(
      database.query(`INSERT INTO activity (name_activity, description_activity, age_min, age_max, image_url)
      VALUES 
      ('Finger Painting', 'Let your child''s creativity soar with our delightful Finger Painting activity! Perfect for little artists, this hands-on experience encourages self-expression and imagination.', 1, 6, 'images/fingerPainting.jpg' ),
      ('Puppet Theater', 'Create a small puppet theater and encourage children to invent and perform their own stories.', 2, 8, 'images/puppet.jpg')`)
    );

    // Optional: Truncate tables (remove existing data)
    // await database.query("truncate item");

    // Insert fake data into the 'item' table
    // for (let i = 0; i < 10; i += 1) {
    //   queries.push(
    //     database.query("insert into item(title) values (?)", [
    //       faker.lorem.word(),
    //     ])
    //   );
    // }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
