import { NextFunction, Request, Response } from "express";

// Checks if authorizacion header starts with "pk_test_"
const checkPkTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization || null;

    if (!authorization) {
      return res.status(400).send({ error: "AUTHORIZATION_HEADER_MISSING" });
    }

    if (authorization?.startsWith("pk_test_")) {
      next();
    } else {
      return res.status(401).send({ error: "NOT_VALID_pk_test" });
    }
  } catch (e) {
    res.status(400);
    res.send("ERROR_WITH_AUTHORIZATION");
  }
};

const checkValidToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization || null;

    if (!authorization) {
      return res.status(400).send({ error: "AUTHORIZATION_HEADER_MISSING" });
    }

    if (!/^[a-zA-Z0-9]{16}$/.test(authorization)) {
      return res.status(400).send({ error: "INVALID_TOKEN_FORMAT" });
    }
    next();
  } catch (e) {
    res.status(400);
    res.send("ERROR_WITH_AUTHORIZATION");
  }
};

export { checkPkTest, checkValidToken };
