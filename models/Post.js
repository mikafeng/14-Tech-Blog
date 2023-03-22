const {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../config/connection');

class Post extends Model { }

Post.init(
    {
       id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        post_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'post',

    }
);

module.exports = Post;
 