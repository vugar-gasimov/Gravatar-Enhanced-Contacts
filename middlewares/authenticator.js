const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { CustomError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticator = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(CustomError(401, "Unauthorized: Invalid Bearer token"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return next(CustomError(401, "Unauthorized: User not found"));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(CustomError(401, "Unauthorized: Invalid or expired token"));
  }
};

module.exports = authenticator;
