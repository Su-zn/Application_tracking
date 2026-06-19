import { z } from "zod";
import { Request, Response, NextFunction } from "express";
type validationTarget = 'body' | 'query' | 'params';
export declare function validate(schema: z.ZodSchema, target: validationTarget): (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=schemaValidate.middleware.d.ts.map