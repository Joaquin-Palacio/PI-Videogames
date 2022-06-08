const axios = require("axios");
const Genre = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;


async function GenresDataBase() {
  const generos = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const dataGenres = generos.data.results;
  dataGenres.forEach((e) => {
    Genre.findOrCreate({
      where: { name: e.name, id: e.id },
    });
  });
}

module.exports = GenresDataBase;
