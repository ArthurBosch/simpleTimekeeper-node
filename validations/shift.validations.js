import { body } from "express-validator";

export const addShiftValidator = [
  body("userId", "Must be integer").isInt(),
  body("workplaceId", "Must be integer").isInt(),
  body("wage", "wage must integer").optional().isInt(),
  body("timeStart", "start time must be ISO string").isString(),
  body("timeEnd", "finish time must be ISO string").optional().isString(),
];

export const updateShiftValidator = [
  body("workplaceId", "Must be integer").isInt(),
  body("timeStart", "start time must be ISO string").isString(),
  body("timeEnd", "finish time must be ISO string").isString(),
];
