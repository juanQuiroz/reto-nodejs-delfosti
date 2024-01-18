import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";

const getCard = (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, "ERROR_GETTING_CARD");
  }
};

const generateTokenCard = (req: Request, res: Response) => {
  const { body } = req;

  try {
    res.send(body);
  } catch (e) {
    handleHttp(res, "ERROR_GENERATING_TOKENCARD");
  }
};

export { getCard, generateTokenCard };
