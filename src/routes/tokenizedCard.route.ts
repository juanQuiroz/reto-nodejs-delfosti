import { Router } from "express";
import {
  generateTokenCard,
  getCard,
} from "../controllers/tokenizedCard.controller";
import { checkPkTest } from "../middlewares/checks.middleware";
import { validateTokenization } from "../validators/tokenizedCard";

const router = Router();

router.get("/getCard", getCard);
router.post(
  "/generateToken",
  checkPkTest,
  validateTokenization,
  generateTokenCard
);

export { router };
