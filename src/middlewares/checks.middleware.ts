import { NextFunction, Request, Response } from "express";

// Checks if authorizacion header starts with "pk_test_"
const checkPkTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization || null;

    if (authorization?.startsWith("pk_test_")) {
      next();
    } else {
      res.send("NOT_VALID_pk_test");
    }
  } catch (e) {
    res.status(400);
    res.send("ERROR_WITH_AUTHORIZATION");
  }
};

export { checkPkTest };
