import { ZodError } from "zod";
export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            errors: err.issues,
        });
    }
    return res.status(500).json({
        message: err.message || "Internal server error",
    });
};
//# sourceMappingURL=errorValidate.middleware.js.map