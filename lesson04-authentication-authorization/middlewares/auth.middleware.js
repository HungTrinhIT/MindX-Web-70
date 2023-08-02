import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, "MINDX_PRIVATE_KEY");
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.json({
        message: "Unauthorized! Token was expired",
      });
    } else {
      return res.json({
        message: "Unauthorized",
      });
    }
  }
};
