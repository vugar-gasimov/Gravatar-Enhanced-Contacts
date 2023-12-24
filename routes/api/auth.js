const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticator } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signup);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticator, ctrl.getCurrent);
router.post("/logout", authenticator, ctrl.logout);
router.post(
  "/updateUserSubscription",
  authenticator,
  ctrl.updateUserSubscription
);
module.exports = router;
