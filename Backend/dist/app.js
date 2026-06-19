import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from './routes/index.router.js';
import { globalErrorHandler } from "./middlewares/errorValidate.middleware.js";
dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/v1', apiRouter);
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map