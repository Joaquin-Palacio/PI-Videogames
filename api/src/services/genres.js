const { Genre } = require("../db");
async function genres() {
  console.log("Guardando generos en base de datos");
  console.log("Espera por favor...");
  //const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  let genres = [
    {
      id: 1,
      name: "Action",
    },
    {
      id: 2,
      name: "Adventure",
    },
    {
      id: 3,
      name: "Indie",
    },
    {
      id: 5,
      name: "Strategy",
    },
    {
      id: 4,
      name: "RPG",
    },
    {
      id: 6,
      name: "Shooter",
    },
    {
      id: 7,
      name: "Casual",
    },
    {
      id: 8,
      name: "Simulation",
    },
    {
      id: 9,
      name: "Puzzle",
    },
    {
      id: 10,
      name: "Arcade",
    },
    {
      id: 11,
      name: "Platformer",
    },
    {
      id: 12,
      name: "Racing",
    },
    {
      id: 13,
      name: "Massively Multiplayer",
    },
    {
      id: 14,
      name: "Sports",
    },
    {
      id: 15,
      name: "Fighting",
    },
    {
      id: 16,
      name: "Family",
    },
  ];
  let generos = genres.map((g) => {
    Genre.create({
      name: g.name,
    });
  });
  await Promise.all(generos);
  console.log("Generos guardados");
  console.log("Back levantado exitosamente✔️ , PUEDES SEGUIR CODEANDO!");
}

module.exports = { genres };
