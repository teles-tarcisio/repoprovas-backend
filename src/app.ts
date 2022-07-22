import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares/index.js";
import mainRouter from "./routers/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(mainRouter);
app.use(errorHandler);

export default app;

