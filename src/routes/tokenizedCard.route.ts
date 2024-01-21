import { Response, Router } from "express";
import {
  generateTokenCard,
  getCard,
} from "../controllers/tokenizedCard.controller";
import { checkPkTest, checkValidToken } from "../middlewares/checks.middleware";
import { validateTokenization } from "../validators/tokenizedCard";

const router = Router();

router.get("/getCard", checkValidToken, getCard);
router.post(
  "/generateToken",
  checkPkTest,
  validateTokenization,
  generateTokenCard
);

export { router };
