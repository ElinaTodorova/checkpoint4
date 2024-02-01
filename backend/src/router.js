const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const giftControllers = require("./controllers/giftControllers");
const activityControllers = require("./controllers/activityControllers");
const userMiddleware = require("./middlewares/userMiddleware");
const userControllers = require("./controllers/userControllers");
const { hashPassword, verifyToken } = require("./services/auth");
const authControllers = require("./controllers/authControllers");

// Route to get a list of items
router.get("/gifts", giftControllers.browse);
router.get("/activities", activityControllers.browse);

// Route to get a specific gift by ID
router.get("/gifts/:id", giftControllers.read);

// Route to add a new user
router.post("/users", userMiddleware, hashPassword, userControllers.add);

// Login
router.post("/login", authControllers.login);

router.use(verifyToken);
// Route to add a new gift
router.post("/gifts", giftControllers.add);
// Route to update
router.put("/gifts/:id/edit", giftControllers.edit);
// Route to delete
router.delete("/gifts/:id/delete", giftControllers.deleteG);
// Logout
router.get("/logout", authControllers.logout);

/* ************************************************************************* */

module.exports = router;
