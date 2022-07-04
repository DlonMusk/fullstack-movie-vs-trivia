const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CurrentData extends Model { };

CurrentData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        stat: {
            type: DataTypes.INTEGER
        },
        img: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'currentData',
    }
)