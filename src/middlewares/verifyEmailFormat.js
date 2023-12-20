const { AppError } = require("../errors");

const verifyEmailFormat = (req, _res, next) => {
  const { email } = req.body;
  const atSignIndex = email.indexOf("@");

  if (
    atSignIndex === -1 ||
    !email.slice(-(email.length - atSignIndex)).includes(".")
  )
    throw new AppError("Invalid email format.", 400);

  return next();
};

module.exports = verifyEmailFormat;
