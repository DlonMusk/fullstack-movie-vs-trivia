const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model { }

//define columns
Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        high_score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        current_score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        // Link to database connection
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game',
    });

module.exports = Game;
