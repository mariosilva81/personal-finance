const { AppError } = require("../errors");
const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth)
    throw new AppError(
      "To access this resource, a valid authentication token must be sent.",
      401
    );

  const token = auth.split(" ")[1];

  const decoded = verify(token, process.env.SECRET_KEY);

  res.locals.decoded = decoded;

  return next();
};

module.exports = verifyToken;
