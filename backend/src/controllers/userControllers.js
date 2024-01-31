const tables = require("../tables");

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const newUserId = await tables.user.create(user);
    res.status(201).json({ newUserId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
};
