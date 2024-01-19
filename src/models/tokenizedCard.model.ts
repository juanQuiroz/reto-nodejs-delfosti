import { Schema, Types, Model, model } from "mongoose";
import { tokenizedCard } from "../interfaces/tokenizedCard.interface";

const TokenizedCardSchema = new Schema<tokenizedCard>(
  {
    card_number: { type: Number, minlength: 13, maxlength: 16 },
    cvv: { type: Number, minlength: 3, maxlength: 4 },
    expiration_month: { type: String, minlength: 1, maxlength: 2 },
    expiration_year: { type: String, length: 4 },
    email: { type: String, minlength: 5, maxlength: 100 },
    token: { type: String, length: 16, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const tokenizedCardModel = model("tokenizedCards", TokenizedCardSchema);
export default tokenizedCardModel;
