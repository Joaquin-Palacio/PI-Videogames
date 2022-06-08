const axios = require("axios");
require("dotenv").config();
const {
  API_KEY
} = process.env;

async function getApiGames(name) {
  // arrays por pagina
  let pageOne = [];
  let pageTwo = [];
  let pageThree = [];
  let pageFour = [];

  if (!name) {
    pageOne = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=25`
    );
    let nextPage = pageOne.data.next
    pageOne = [...pageOne.data.results];
    // 25 --> 50 ..........................................
    pageTwo = await axios.get(
      nextPage
    );
    nextPage = pageTwo.data.next

    pageTwo = [...pageTwo.data.results];
    // 50 --> 75 .........................................
    pageThree = await axios.get(
      nextPage
    );
    nextPage = pageThree.data.next

    pageThree = [...pageThree.data.results];
    //75--100> .............................................
    pageFour = await axios.get(
     nextPage
    );    
     pageFour = [...pageFour.data.results];

    // ....................................................
    return [...pageOne, ...pageTwo, ...pageThree, ...pageFour];
    // 
    // ....................................................
  } else {
    // En caso de que pasen Name
    pageOne = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`
    );

    return [...pageOne.data.results];
    // ....................................................
  }
};
module.exports = getApiGames;