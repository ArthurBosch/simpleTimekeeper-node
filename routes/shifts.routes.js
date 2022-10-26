import Router from "express";
const router = new Router();
import shiftsController from "../controllers/shifts.controller.js";
import {
  addShiftValidator,
  updateShiftValidator,
} from "../validations/shift.validations.js";
import errorsHandler from "../middlewares/handleValidationErrors.js";
import checkAuth from "../middlewares/checkAuth.js";

router.get("/shift", checkAuth, shiftsController.getAllShiftsForUser);
router.get("/shift/:id", checkAuth, shiftsController.getShiftsForWorkplace);
router.post(
  "/shift",
  checkAuth,
  addShiftValidator,
  errorsHandler,
  shiftsController.addShift
);
router.patch(
  "/shift/:id",
  checkAuth,
  updateShiftValidator,
  errorsHandler,
  shiftsController.updateShift
);
router.delete(
  "/shift/:id",
  checkAuth,
  errorsHandler,
  shiftsController.deleteShift
);

export default router;
