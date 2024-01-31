// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all gifts from the database
    const gifts = await tables.gift.readAll();

    // Respond with the items in JSON format
    res.json(gifts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const gift = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.gift.create(gift);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const gift = req.body;
    await tables.gift.update(id, gift);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  add,
  edit,
};
