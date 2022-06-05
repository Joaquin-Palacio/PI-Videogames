require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { Platform } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const allPlatforms = await Platform.findAll();
    res.send(allPlatforms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
