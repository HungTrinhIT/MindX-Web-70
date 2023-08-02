import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const user = req.user;

  const mockData = [
    {
      id: 1,
      title: "Learn ReactJS in 30mins",
    },
    {
      id: 2,
      title: "Learn NodeJS in 5 days",
    },
  ];

  return res.json({ mockData, user });
});

export default router;
