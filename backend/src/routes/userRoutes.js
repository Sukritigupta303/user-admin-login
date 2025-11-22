// src/routes/userRoutes.js
const express = require("express");
const { getUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const { updateUser }  = require("../controllers/userController");
const { updatePassward} = require("../controllers/userController");
const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.put("/:id", authMiddleware, updateUser);
router.put("/:id" ,authMiddleware, updatePassward);

module.exports = router;
