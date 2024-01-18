import { Request, Response, Router } from "express";
import { generateTokenCard, getCard } from "../controllers/card";

const router = Router();

router.get("/getToken", getCard);

router.post("/generateToken", generateTokenCard);

export { router };
