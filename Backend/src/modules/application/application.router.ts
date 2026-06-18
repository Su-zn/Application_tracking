import { Router } from "express";
import { createApplicationController, getAllApplicationsController, getApplicationByIdController, updateApplicationController, deleteApplicationController, searchApplicationController, filterApplicationsByStatusController } from "../application/application.controller.js"
import { validate } from "../../middlewares/schemaValidate.middleware.js";
import { createApplicationSchema, searchSchema,statusFilterSchema,updateApplicationSchema } from "./application.schema.js";
import { idParamSchema } from "./application.schema.js";

const router = Router();

router.post('/createApplication',validate(createApplicationSchema,'body'),createApplicationController);
router.get('/getApplications', getAllApplicationsController);
router.get('/searchApplications',searchApplicationController);
router.get('/filterApplicationsByStatus',filterApplicationsByStatusController);
router.get('/getApplicationById/:id',validate(idParamSchema,'params'),getApplicationByIdController);
router.put('/updateApplication/:id',validate(idParamSchema,'params'),validate(updateApplicationSchema,'body'),updateApplicationController);
router.delete('/deleteApplication/:id',validate(idParamSchema,'params'),deleteApplicationController);


export default router;