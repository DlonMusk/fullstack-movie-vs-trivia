const { User } = require('../models');

const userData = [
  {
    "username": "Kane33",
    "email": "kt3@imdb.com",
    "password": "password123"
  },
  {
    "username": "Josh-71",
    "email": "j687@gmail.com",
    "password": "password123"
  },
  {
    "username": "Tyrese-M",
    "email": "Tk0nan@gmail.com",
    "password": "password123"
  }
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;