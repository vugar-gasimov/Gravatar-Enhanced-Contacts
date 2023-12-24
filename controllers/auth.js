const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { CustomError, ctrlWrapper } = require("../helpers");
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw CustomError(409, "This email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 11);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw CustomError(401, "You email or password is invalid.");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw CustomError(401, "You email or password is invalid.");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "11h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      name: user.name,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name, subscription, updatedAt } = req.user;
  res.json({
    email,
    name,
    subscription,
    updatedAt,
  });
};

const logout = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

const updateUserSubscription = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { subscription: newSubscription } = req.body;
    const validSubscriptions = ["starter", "pro", "business"];
    if (!validSubscriptions.includes(newSubscription)) {
      return res.status(400).json({ message: "Invalid subscription type" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { subscription: newSubscription },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, email, subscription, token, updatedAt } = updatedUser;
    res
      .status(200)
      .json({ user: { name, email, subscription, token, updatedAt } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update subscription", error: error.message });
  }
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
