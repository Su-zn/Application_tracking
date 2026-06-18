import {z,ZodError} from "zod";
import {Request,Response,NextFunction} from "express";

type validationTarget = 'body' | 'query' | 'params';


export function validate (schema:z.ZodSchema,target:validationTarget){
    return (req:Request,res:Response,next:NextFunction) => {
        const result = schema.safeParse(req[target]);
        if(!result.success){
            res.status(400).json({
                success:false,
                message:"Validation error",
                errors: result.error.issues.map((err) => ({
                    path: err.path,
                    message: err.message,
                    code:err.code
                }))
            });
            return;
        } 
        req[target] = result.data;
        next();

    }
}