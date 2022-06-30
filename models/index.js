const User = require('./user');
const Game = require('./game');

User.hasMany(Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Game.belongsTo(User);

module.exports = { User, Game };