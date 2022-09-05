const { Router } = require("express");
const router = Router();
const saveVideogame = require("../services/videogames");
const { Videogame, Genre, Platform } = require("../db");

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  try {
    const testGames = await Videogame.findAll();
    if (!testGames.length) {
      let juego = await saveVideogame();
      console.log(juego);
      let copi = juego;
      juego.map((e) => {
        Videogame.findOrCreate({
          where: {
            id: e.id,
            name: e.name,
            released: e.released,
            image: e.image,
            description: e.description,
            rating: e.rating,
          },
        });
      });
      await Promise.all(juego);
      console.log("añadiendo generos a videojuegos");
      let genre = juego.map((e) => e.genres.map((g) => g));
      for (let i = 0; i < copi.length; i++) {
        let genreDb = await Genre.findAll({
          where: {
            name: genre[i],
          },
        });
        Videogame.findByPk(copi[i].id).then((response) =>
          response.addGenre(genreDb)
        );
      }
      console.log(
        "Todos los generos han sido guardados,⭐️ ¡Ya puedes comprar juegos en la tienda! ⭐️"
      );

      console.log("añadiendo plataformas a videojuegos");
      let platforms = juego.map((e) => e.platforms.map((p) => p));
      for (let i = 0; i < copi.length; i++) {
        let platformDB = await Platform.findAll({
          where: {
            name: platforms[i],
          },
        });
        Videogame.findByPk(copi[i].id).then((response) =>
          response.addPlatform(platformDB)
        );
      }
      console.log(
        "Todos las plataformas han sido guardados,⭐️ ¡Ya puedes comprar juegos en la tienda! ⭐️"
      );

      let totalData = await Videogame.findAll({
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            // ----
            model: Platform,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(totalData);
    } else {
      if (name) {
        let totalData = await Videogame.findAll({
          include: [
            {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              // ----
              model: Platform,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
        });

        let onlyfifteen = totalData
          .filter((e) => e.name.includes(name.toUpperCase()))
          .slice(0, 16);
        if (onlyfifteen.length) {
          res.send(onlyfifteen);
        } else {
          return res.send([]).status(404);
        }
      } else {
        let totalData = await Videogame.findAll({
          include: [
            {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              // ----
              model: Platform,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
        });
        res.send(totalData);
      }
    }

    // Promise.all([videogamesInDb]).then((response) => {
    //   const [videogamesInDb] = response;

    //   let allVideogames = [...videogamesInDb, ...videogamesInApi];

    //   if (name) {
    //     let onlyfifteen = allVideogames.filter(e => e.name.includes(name.toUpperCase())).slice(0, 16)
    //     res.send(onlyfifteen);
    //   } else if (!allVideogames.length) {

    //     return res.send('No response').status(404);
    //   } else

    //     res.send(allVideogames);
    // });
  } catch (error) {
    next(error);
  }
});

//Si necesitamos buscar por name a toda la Api con limit 15

// try {
//     if(name){
//         videogamesInApi = await getApiGames(name);
//         videogamesInDb = await getVideoGamesCreated(name)
//    todo viene en arrays
//     }else{
//         videogamesInApi = await getApiGames();
//         videogamesInDb = await getVideoGamesCreated()
//   todo viene en arrays
//     }

//     Promise.all([videogamesInApi, videogamesInDb]).then((response) => {
//         const [videogamesInApi, videogamesInDb] = response;

//         let VideogamesfromApi = videogamesInApi.map((e) => {
//           return {
//             id: e.id,
//             name: e.name,
//             released: e.released,
//             image: e.background_image,
//             rating: e.rating,
//             description: e.slug,
//             genres: e.genres.map((g) => g.name),
//             platforms: e.platforms.map((p) => p.platform.name)

//           };

//         });

//         let allVideogames = [...videogamesInDb, ...VideogamesfromApi];
//         if(!allVideogames.length){

//           return res.send('No response').status(404);
//         }

//         res.send(allVideogames);
//       });
//     } catch (error) {
//       next(error);
//     }
//   });

//         let videogames = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results.map(e => ({
//              name: e.name,
//              id: e.id,
//              rating: e.rating,
//              image: e.background_image,
//              genres: e.genres.map((x) => x.name),
//              platforms: e.platforms.map((z) => z.platform.name)

//             }));
//             if(name){
//                 let videoGames = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`)).data.results.map(e => ({
//                     id: e.id,
//                     name: e.name,
//                     rating: e.rating,
//                     image: e.background_image,
//                     genres: e.genres.map((x) => x.name),
//                     platforms: e.platforms.map((z) => z.platform.name)
//                    }));
//                 let videogame = await videoGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
//                 if(videogame.length){
//                     res.send(videogame);
//                 } else {
//                 res.send('No hay resultados con tu búsqueda');
//                 }
//             } else {
//                 return res.send(videogames);
//             }
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;
