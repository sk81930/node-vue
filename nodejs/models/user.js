'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
var bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
// const User = sequelize.define('User',{
//   name:DataTypes.STRING,email:DataTypes.STRING,password:DataTypes.STRING,role:DataTypes.STRING
// });

// User.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// User.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
// module.exports = User;

let data = function(sequelize, DataTypes) {
    const User = sequelize.define('Users', { name:DataTypes.STRING,email:DataTypes.STRING,password:DataTypes.STRING,role:DataTypes.STRING
    }, {
        freezeTableName: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });

    return User;
}

const User = data(sequelize,DataTypes);

module.exports = User;