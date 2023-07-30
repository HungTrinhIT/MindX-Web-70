export const apiLogMiddleware = (req, res, next) => {
  const logDate = new Date().toISOString();
  const { method, originalUrl, body, query, params } = req;

  console.log({
    date: logDate,
    method,
    originalUrl,
    body,
    query,
    params,
  });
  next();
};
