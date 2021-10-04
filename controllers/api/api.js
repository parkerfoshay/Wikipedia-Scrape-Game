const router = require("express").Router();
require("dotenv").config();
const redis = require("../../config/redis");

const { comparePages } = require("../../crawler/crawler")

router.get("/", async (req, res) => {
  try {
    const dest = await redis.get("dest_url");
    const current = req.query.currentUrl;

    if (dest === undefined) {
      res.status(500).json("Please enter a target wiki");
    }

    if (current === undefined) {
      res.status(500).json("Please choose a wiki");
    }
    console.log(dest);
    console.log(current);

    res.status(200).json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const start = req.body[0].startUrl;
    const dest = req.body[0].dest;

    console.log(start);
    console.log(dest);

    await redis.set("start_url", start, "EX", 360000);
    await redis.set("dest_url", dest, "EX", 360000);

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
