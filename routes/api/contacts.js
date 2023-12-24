const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId, authenticator } = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

router.get("/", authenticator, ctrl.getAllContacts);

router.post(
  "/",
  authenticator,
  validateBody(schemas.addSchema),
  ctrl.addAContact
);

router.get("/:id", authenticator, isValidId, ctrl.getContactById);

router.put(
  "/:id",
  authenticator,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:id",
  authenticator,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateFavoriteById
);
router.patch(
  "/:id/favorite",
  authenticator,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

router.delete("/:id", authenticator, isValidId, ctrl.removeContactById);

module.exports = router;
