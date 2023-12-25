const mongoose = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: mailFormat,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required and min length is 6 symbols"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      required: [true, "Avatar is required"],
      default: "../public/default_avatar/8380015.webp",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(mailFormat).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(mailFormat).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  signupSchema,
  loginSchema,
};

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
  schemas,
};
