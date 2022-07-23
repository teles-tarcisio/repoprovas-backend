import { Router } from "express";
import userRouter from "./userRouter.js";
import testsRouter from "./testsRouter.js";

const mainRouter = Router();
mainRouter.use(userRouter);
mainRouter.use(testsRouter);

export default mainRouter;