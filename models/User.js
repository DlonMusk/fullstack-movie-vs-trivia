const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bycrpt = require("bycrpt");

//Create a sequelize model for User
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


//define columns
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.INTEGER,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //password is automatically hashed before it is created
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        // Link to database connection
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    });

module.exports = User;


