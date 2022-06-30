const { Game } = require('../models');

//update to seeds file

const gameData = [
  {
    movie_name: 'Thor Ragnarok',
    high_score: "93%",
    user_id: 4
  },
  {
    movie_name: 'Uncut Gems',
    high_score: "92%",
    user_id: 1

  },
  {
    movie_name: 'Hocus Pocus',
    high_score: "37%",
    user_id: 3
  },
  {
    movie_name: 'Star Wars: The Rise of Skywalker',
    high_score: "52%",
    user_id: 2

  },
];

const seedGallery = () => Gallery.bulkCreate(gameData);

module.exports = seedGallery;
