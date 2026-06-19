export function validate(schema, target) {
    return (req, res, next) => {
        const result = schema.safeParse(req[target]);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: result.error.issues.map((err) => ({
                    path: err.path,
                    message: err.message,
                    code: err.code
                }))
            });
            return;
        }
        req[target] = result.data;
        next();
    };
}
//# sourceMappingURL=schemaValidate.middleware.js.map