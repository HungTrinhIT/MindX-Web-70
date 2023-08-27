import asyncHandler from "express-async-handler";

export const validateSchema = (schema) => {
  return asyncHandler(async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      console.log(
        "🚀 ~ file: validate.middleware.js:9 ~ returnasyncHandler ~ error:",
        error
      );
      res.status(400).json({ error: error.errors });
    }
  });
};
