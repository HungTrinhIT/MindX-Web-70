import { users } from "../index.js";

export let stats = [];

export const statisticMiddleware = (resource) => (req, res, next) => {
  const api_key = req.query.api_key;
  const currentUser = users.find((u) => u.apiKey === api_key);

  const newStats = stats.map((stat) => {
    if (stat.apiKey === api_key) {
      return {
        ...stat,
        [resource]: stat[resource]++,
      };
    } else {
      return {
        user: currentUser.username,
        student: 0,
        teacher: 0,
        subject: 0,
        [resource]: 1,
      };
    }
  });

  stats = newStats;
  next();
};
