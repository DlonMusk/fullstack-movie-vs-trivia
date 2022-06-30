const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

//define columns
Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        high_score: { 
            type: DataTypes.INTEGER,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Link to database connection
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Game',
    });

module.exports = Game;
