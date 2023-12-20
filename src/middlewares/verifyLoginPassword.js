const { AppError } = require("../errors");
const userRepository = require("../repositories/users.repository");
const bcryptjs = require("bcryptjs");

const verifyLoginPassword = async (req, _res, next) => {
  const { email, password } = req.body;
  const { rows: user } = await userRepository.findOne("email", email);
  const cryptPassword = user[0].password;

  const passwordIsValid = await bcryptjs.compare(password, cryptPassword);

  if (!passwordIsValid)
    throw new AppError("Incorrect email and/or password.", 401);

  return next();
};

module.exports = verifyLoginPassword;
