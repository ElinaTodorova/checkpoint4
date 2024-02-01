const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const giftControllers = require("./controllers/giftControllers");
const activityControllers = require("./controllers/activityControllers");
const userMiddleware = require("./middlewares/userMiddleware");
const userControllers = require("./controllers/userControllers");
const { hashPassword } = require("./services/auth");
const authControllers = require("./controllers/authControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/gifts", giftControllers.browse);
router.get("/activities", activityControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/gifts/:id", giftControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/gifts", giftControllers.add);
router.post("/users", userMiddleware, hashPassword, userControllers.add);

// Route to update
router.put("/gifts/:id/edit", giftControllers.edit);

// Route to delete
router.delete("/gifts/:id/delete", giftControllers.deleteG);

// Login
router.post("/login", authControllers.login);

// Logout
router.get("/logout", authControllers.logout);

/* ************************************************************************* */

module.exports = router;
