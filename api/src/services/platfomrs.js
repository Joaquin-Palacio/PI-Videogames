const { Platform } = require("../db");
async function platforms() {
  console.log("Guardando generos en base de datos");
  console.log("Espera por favor...");
  //const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  let platform = [
    {
      id: 1,
      name: "PC",
    },
    {
      id: 2,
      name: "PlayStation 5",
    },
    {
      id: 3,
      name: "PlayStation 4",
    },
    {
      id: 4,
      name: "Xbox One",
    },
    {
      id: 5,
      name: "Xbox Series S/X",
    },
    {
      id: 6,
      name: "Nintendo Switch",
    },
    {
      id: 7,
      name: "iOS",
    },
    {
      id: 8,
      name: "Android",
    },
    {
      id: 9,
      name: "Nintendo 3DS",
    },
    {
      id: 10,
      name: "Nintendo DS",
    },
    {
      id: 11,
      name: "Nintendo DSi",
    },
    {
      id: 12,
      name: "macOS",
    },
    {
      id: 13,
      name: "Linux",
    },
    {
      id: 14,
      name: "Xbox 360",
    },
    {
      id: 15,
      name: "Xbox",
    },
    {
      id: 16,
      name: "PlayStation 3",
    },
    {
      id: 17,
      name: "PlayStation 2",
    },
    {
      id: 18,
      name: "PlayStation",
    },
    {
      id: 19,
      name: "PS Vita",
    },
    {
      id: 20,
      name: "PSP",
    },
    {
      id: 21,
      name: "Wii U",
    },
    {
      id: 22,
      name: "Wii",
    },
    {
      id: 23,
      name: "GameCube",
    },
    {
      id: 24,
      name: "Nintendo 64",
    },
    {
      id: 25,
      name: "Game Boy Advance",
    },
    {
      id: 26,
      name: "Game Boy Color",
    },
    {
      id: 27,
      name: "Game Boy",
    },
    {
      id: 28,
      name: "SNES",
    },
    {
      id: 29,
      name: "NES",
    },
    {
      id: 30,
      name: "Classic Macintosh",
    },
    {
      id: 31,
      name: "Apple II",
    },
    {
      id: 32,
      name: "Commodore / Amiga",
    },
    {
      id: 33,
      name: "Atari 7800",
    },
    {
      id: 34,
      name: "Atari 5200",
    },
    {
      id: 35,
      name: "Atari 2600",
    },
    {
      id: 36,
      name: "Atari Flashback",
    },
    {
      id: 37,
      name: "Atari 8-bit",
    },
    {
      id: 38,
      name: "Atari ST",
    },
    {
      id: 39,
      name: "Atari Lynx",
    },
    {
      id: 40,
      name: "Atari XEGS",
    },
    {
      id: 41,
      name: "Genesis",
    },
    {
      id: 42,
      name: "SEGA Saturn",
    },
    {
      id: 43,
      name: "SEGA CD",
    },
    {
      id: 44,
      name: "SEGA 32X",
    },
    {
      id: 45,
      name: "SEGA Master System",
    },
    {
      id: 46,
      name: "Dreamcast",
    },
    {
      id: 47,
      name: "3DO",
    },
    {
      id: 48,
      name: "Jaguar",
    },
    {
      id: 49,
      name: "Game Gear",
    },
    {
      id: 50,
      name: "Neo Geo",
    },
  ];
  let platforms = platform.map((p) => {
    Platform.create({
      name: p.name,
    });
  });
  await Promise.all(platforms);
  console.log("plataformas guardados");
  console.log("Back levantado exitosamente✔️ , PUEDES SEGUIR CODEANDO!");
}
module.exports = { platforms };
