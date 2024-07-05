const { ZodError } = require("zod");

const validateSchema = (validationSchema) => {
  return async (req, res, next) => {
    try {
      validationSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((issue) => ({
          field: issue.path.join("."),
          issue: issue.message,
        }));

        res.status(400).json({
          errors: "Validation Error",
          from: "validateSchema",
          messages: errorMessage,
        });
      } else {
        res.status(500).json({
          errors: "Internal Server Error",
          from: "validateSchema",
          message: error.message,
        });
      }
    }
  };
};

module.exports = validateSchema;
