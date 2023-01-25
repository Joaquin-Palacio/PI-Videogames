
const server = require("./src/app");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;
const { genres } = require("./src/services/genres.js");
const { platforms } = require("./src/services/platforms.js");
const saveVideogame = require("./src/services/videogames.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
    genres();
    platforms();
    saveVideogame();
  });
});
