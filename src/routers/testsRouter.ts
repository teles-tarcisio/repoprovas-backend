import { Router } from "express";
import {
  validateSchema,
  ensureAuthentication,
} from "../middlewares/index.js";
import { newTestSchema } from "../schemas/newTestSchema.js";
import { testsController } from "../controllers/index.js";

const testsRouter = Router();
testsRouter.use(ensureAuthentication);

testsRouter.post("/tests/new",
  validateSchema(newTestSchema),
  testsController.create,
);


export default testsRouter;