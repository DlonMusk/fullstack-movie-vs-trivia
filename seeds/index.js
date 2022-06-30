const User = require('./userData');
const Game = require('./gameData');

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Game.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Game
};