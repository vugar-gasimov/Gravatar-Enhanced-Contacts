const Contact = require("../models/contact");
const { CustomError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 11, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite) {
    query.favorite = favorite === "true"; // Convert to boolean
  }
  const result = await Contact.find(query, "-createdAt -updatedAt -__v", {
    skip,
    limit,
  }).populate("owner", "name");
  res.json(result);
};

const addAContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne(
    { _id: id },
    "-createdAt -updatedAt -__v"
  );
  if (!result) {
    throw CustomError(404, "Not found");
  }
  res.json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    select: "-createdAt -updatedAt -__v",
  });
  if (!result) {
    throw CustomError(404, "Contact not found");
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    "-createdAt -updatedAt -__v"
  );
  if (!result) {
    throw CustomError(404, "Contact not found");
  }
  res.json(result);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw CustomError(404, "Contact not found");
  }
  res.json({
    message: "Contact is deleted successfully",
  });
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  addAContact: ctrlWrapper(addAContact),
  getContactById: ctrlWrapper(getContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  removeContactById: ctrlWrapper(removeContactById),
};
