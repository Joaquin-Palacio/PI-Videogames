require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const allGenres = await Genre.findAll();
    res.send(allGenres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
