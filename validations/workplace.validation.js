import { body } from "express-validator";

export const createWorkplaceValidator = [
  body("name", "name must be 3 characters at least, 15 maximum")
    .isLength({ min: 3 }, { max: 15 })
    .isString(),
  body("wage", "base wage must be an integer").isInt(),
  body("currency", "currency must be a string").isString(),
  body("userId", "got no userId").isInt(),
];
