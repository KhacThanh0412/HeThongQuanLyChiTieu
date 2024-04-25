const Category = require("../models/CategoriesModel");

exports.getAllCategories = async () => {
  return await Category.find();
};
