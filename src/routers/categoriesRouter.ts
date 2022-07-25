import { Router } from "express";
import {
  ensureAuthentication,
} from "../middlewares/index.js";

import { categoriesController } from "../controllers/index.js";

const categoriesRouter = Router();
categoriesRouter.use(ensureAuthentication);

categoriesRouter.get("/categories",
  categoriesController.get,
);


export default categoriesRouter;