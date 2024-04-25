const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoriesController");

router.get("/categories", categoryController.getAllCategories);

module.exports = router;
