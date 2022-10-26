import { body } from "express-validator";

export const signupValidator = [
  body("email", "Incorrect email format").isEmail(),
  body("name", "Length of name is too short (min: 5)").isLength({
    min: 3,
  }),
  body("password", "Password is too short (min: 5)").isLength({ min: 5 }),
];

export const signinValidator = [
  body("email", "Incorrect email format").isEmail(),
  body("password", "Password is too short (min: 5)").isLength({ min: 5 }),
];
