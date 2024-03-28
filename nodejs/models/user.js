
'use strict';
const {
  Model
} = require('sequelize');
var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
          // define association here
        }
        static async update(values, options) {
            // Maybe custom logic here... 
            return super.update(values, { ...options, individualHooks: true });
        }
        async validPassword(password)  {
            return await bcrypt.compareSync(password, this.password);
        }

    }

    User.init({
        name:DataTypes.STRING,
        email:DataTypes.STRING,
        password:DataTypes.STRING,
        role:DataTypes.STRING
    },
    {
        hooks: {
            beforeCreate: (table, options) => {
                if(options && options.password && table.password){
                   // console.log(options,table.password)
                    const salt = bcrypt.genSaltSync();
                    table.password = bcrypt.hashSync(options.password, salt);
                }    
            },beforeUpdate: (table, options) => {
                if(options && options.password && table.password){
                    const salt = bcrypt.genSaltSync();
                    table.password = bcrypt.hashSync(options.password, salt);
                }    
            }
        },
        sequelize,
        modelName: 'User',
    });

    return User;
};


