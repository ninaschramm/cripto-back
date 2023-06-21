import { Router } from "express";

import { newUserSchema } from "@/schemas/authSchemas";
import { validateBody } from "@/middlewares/validation-middleware";
import { createUser } from "@/controllers/authControllers";

const authRouter = Router();

authRouter.post("/", validateBody(newUserSchema), createUser);

export { authRouter };
