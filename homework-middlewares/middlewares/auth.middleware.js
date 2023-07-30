import { users } from "../index.js";

export const authMiddleware = (req, res, next) => {
  const api_key = req.query.api_key;

  if (!api_key) {
    return res.status(400).json({
      message: "Missing an API Key",
    });
  }

  const isValidAPIKey = users.findIndex((user) => user.apiKey === api_key);

  if (isValidAPIKey === -1) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};
