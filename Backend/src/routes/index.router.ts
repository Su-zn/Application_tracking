import { Router } from "express";
import applicationRouter from "../modules/application/application.router.js";


const apiRouter = Router();


apiRouter.use('/application', applicationRouter);



export default apiRouter