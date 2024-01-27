import { check } from "express-validator";
import { validateResult } from "../utils/validate";
import { NextFunction, Request, Response } from "express";

const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.es"];

const validateTokenization = [
  check("cvv")
    .exists()
    .withMessage("cvv is required")
    .notEmpty()
    .withMessage("cvv is required")
    .isNumeric()
    .withMessage("cvv must be a number")
    .isLength({ min: 3, max: 4 })
    .withMessage("cvv must have between 3 and 4 digits"),

  check("expiration_month")
    .exists()
    .withMessage("expiration_month is required")
    .notEmpty()
    .withMessage("expiration_month is required")
    .isString()
    .withMessage("expiration_month must be a string")
    .isLength({ min: 1, max: 2 })
    .withMessage("expiration_month must have between 1 and 2 digits")
    .custom((value) => {
      const month = parseInt(value, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        throw new Error("expiration_month must be a valid month (1-12)");
      }
      return true;
    }),

  check("expiration_year")
    .exists()
    .withMessage("expiration_year is required")
    .notEmpty()
    .withMessage("expiration_year is required")
    .isString()
    .withMessage("expiration_year must be a string")
    .isLength({ min: 4, max: 4 })
    .withMessage("expiration_year must have 4 digits")
    .custom((value) => {
      const currentYear = new Date().getFullYear();
      const expirationYear = parseInt(value, 10);
      if (
        isNaN(expirationYear) ||
        expirationYear < currentYear ||
        expirationYear > currentYear + 5
      ) {
        throw new Error("expiration_year must be max 5 years");
      }
      return true;
    }),

  check("email")
    .exists()
    .withMessage("email is required")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email")
    .custom((value) => {
      const domain = value.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        throw new Error(`Email domain not allowed`);
      }
      return true;
    })
    .isLength({ min: 5, max: 100 })
    .withMessage("email must have between 3 and 4 digits"),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateTokenization };
