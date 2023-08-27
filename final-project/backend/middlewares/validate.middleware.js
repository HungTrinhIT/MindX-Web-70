// Higher order function
// Closure function
// Currying function
export const validationMdw = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors.join(", ") });
  }
};
