import Router from "express";
const router = new Router();
import authController from "../controllers/auth.controller.js";
import {
  signupValidator,
  signinValidator,
} from "../validations/auth.validations.js";
import errorsHandler from "../middlewares/handleValidationErrors.js";
import checkAuth from "../middlewares/checkAuth.js";

router.post(
  "/auth/signup",
  signupValidator,
  errorsHandler,
  authController.createUser
);
router.post(
  "/auth/signin",
  signinValidator,
  errorsHandler,
  authController.signin
);

router.get("/auth/checkAuth", checkAuth, authController.checkToken);
export default router;
