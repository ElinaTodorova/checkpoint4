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

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const gift = await tables.gift.read(req.params.id);

    if (gift === null) {
      res.sendStatus(404);
    } else {
      res.json(gift);
    }
  } catch (err) {
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

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { newGift } = req.body;
    await tables.gift.update(id, newGift);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const deleteG = async (req, res, next) => {
  try {
    await tables.gift.deleteGift(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  edit,
  read,
  deleteG,
};
