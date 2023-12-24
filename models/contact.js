const mongoose = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the contact's name."],
    },
    email: {
      type: String,
      required: [true, "Please provide the contact's email."],
    },
    phone: {
      type: String,
      required: [true, "Please provide the contact's phone number."],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
