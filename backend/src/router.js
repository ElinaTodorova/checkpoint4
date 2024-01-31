const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const giftControllers = require("./controllers/giftControllers");
const activityControllers = require("./controllers/activityControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/gifts", giftControllers.browse);
router.get("/activities", activityControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
