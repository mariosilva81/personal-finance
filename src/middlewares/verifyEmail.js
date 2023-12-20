const { AppError } = require("../errors");
const { userRepository } = require("../repositories/index");

const verifyEmail = async (req, _res, next) => {
  const { email } = req.body;
  const queryResult = await userRepository.findOne("email", email);
  const emailExists = queryResult.rows[0];

  if (emailExists)
    throw new AppError(
      "A user with the provided email is already registered.",
      409
    );

  return next();
};

module.exports = verifyEmail;
