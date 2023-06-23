import { Router } from "express";
import { getCriptoData } from "../controllers/criptoControllers";

const criptoRouter = Router();

criptoRouter.get("/cripto", getCriptoData)

export default criptoRouter