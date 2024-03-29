import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes/tokenizedCard.route";
import db from "./config/mongo";
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
db().then(() => console.log("DB Connected"));
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));

export default app;
