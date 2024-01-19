import { tokenizedCard } from "../interfaces/tokenizedCard.interface";
import tokenizedCardModel from "../models/tokenizedCard.model";

const saveTokenizedCard = async (card: tokenizedCard, token: string) => {
  const tokenizedCard = { ...card, token };
  const response = await tokenizedCardModel.create(tokenizedCard);

  return response;
};

const getTokenizedCard = async (token: any) => {
  const response = await tokenizedCardModel
    .findOne({
      token,
    })
    .select("-token -updatedAt -_id -cvv");

  return response;
};

export { saveTokenizedCard, getTokenizedCard };
