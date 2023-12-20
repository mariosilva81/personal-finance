const { AppError } = require("../errors");

const verifyFields = async (req, _res, next) => {
  if (req.baseUrl === "/login") {
    const { email, password } = req.body;

    if (!email || !password)
      throw new AppError("All mandatory fields must be filled in.", 400);

    return next();
  }

  if (req.baseUrl === "/users") {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw new AppError("All mandatory fields must be filled in.", 400);

    return next();
  }

  if (req.baseUrl === "/transactions") {
    const { description, value, date, category_id, type } = req.body;

    if (!description || !value || !date || !category_id || !type)
      throw new AppError("All mandatory fields must be filled in.", 400);

    if (type !== "income" && type !== "expense")
      throw new AppError("The type must be either 'income' or 'expense'.", 400);

    return next();
  }
};

module.exports = verifyFields;
