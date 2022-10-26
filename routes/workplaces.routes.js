import Router from "express";
const router = new Router();
import workplacesController from "../controllers/workplaces.controller.js";
import { createWorkplaceValidator } from "../validations/workplace.validation.js";
import errorsHandler from "../middlewares/handleValidationErrors.js";
import checkAuth from "../middlewares/checkAuth.js";

router.post(
  "/workplace",
  checkAuth,
  createWorkplaceValidator,
  errorsHandler,
  workplacesController.createWorkplace
);

router.get("/workplace", checkAuth, workplacesController.getWorkplaces);

router.delete(
  "/workplace/:id",
  checkAuth,
  workplacesController.deleteWorkplace
);

export default router;
