const { AppError } = require("../errors");
const { categoriesRepository } = require("../repositories/index");

const verifyCategory = async (req, _res, next) => {
  const { category_id } = req.body;

  const queryResult = await categoriesRepository.findByPk(category_id);
  const categoryExists = queryResult.rows[0];

  if (!categoryExists) throw new AppError("Category not found!", 404);

  return next();
};

module.exports = verifyCategory;
