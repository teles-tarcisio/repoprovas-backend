import { Router } from "express";
import userRouter from "./userRouter.js";
import testsRouter from "./testsRouter.js";
import categoriesRouter from "./categoriesRouter.js";

const mainRouter = Router();
mainRouter.use(userRouter);
mainRouter.use(testsRouter);
mainRouter.use(categoriesRouter);

export default mainRouter;