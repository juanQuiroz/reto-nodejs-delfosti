import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import {
  saveTokenizedCard,
  getTokenizedCard,
} from "../services/tokenizedCard.service";
import { generateToken } from "../utils/tokenGenerator";
import { isExpired } from "../utils/checkExpiration";

const generateTokenCard = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const token = generateToken();
    const response = await saveTokenizedCard(body, token);
    // res.send({ token });
    res.status(201).send({ token });
  } catch (e) {
    handleHttp(res, "ERROR_GENERATING_TOKENCARD", e);
  }
};

const getCard = async (req: Request, res: Response) => {
  const token = req.headers.authorization || null;

  try {
    const card = await getTokenizedCard(token);

    if (card == null) {
      return res.status(404).send({ error: "CARD_NOT_FOUND" });
    }

    if (isExpired(card.createdAt)) {
      return res.status(401).send({ error: "TOKEN_EXPIRED" });
    }
    res.send(card);
  } catch (e) {
    handleHttp(res, "ERROR_GETTING_CARD", e);
  }
};

export { getCard, generateTokenCard };
