const tables = require("../tables");

const userMiddleware = async (req, res, next) => {
  const { email, username, password } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+.[a-z]{2,3}/;

  const existingUser = await tables.user.readUserByEmail(email);
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (existingUser !== undefined) {
    errors.push({ message: "This email has already been used." });
  }

  if (email === undefined) {
    errors.push({ field: "email", message: "This field is required!" });
  } else if (email.length > 255) {
    errors.push({
      field: "email",
      message: "Le nombre maximum de caractères est de 255.",
    });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Email invalide." });
  }

  if (username === undefined) {
    errors.push({ field: "username", message: "This field is required!" });
  } else if (username.length > 150) {
    errors.push({
      field: "username",
      message: "Le nombre maximum de caractères est de 255.",
    });
  }

  if (password === undefined) {
    errors.push({ field: "password", message: "This field is required!" });
  } else if (!passRegex.test(password)) {
    errors.push({
      field: "password",
      message:
        "At least 8 characters, 1 number, 1 special character, 1 uppercase letter.",
    });
  }

  if (errors.length) {
    res.status(402).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = userMiddleware;
