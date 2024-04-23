'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        conversation_user.belongsTo(models.User, {foreignKey: 'sender_id', as: 'sender_id_user'});
        conversation_user.belongsTo(models.User, {foreignKey: 'reciever_id', as: 'reciever_id_user'});
        conversation_user.belongsTo(models.message, {foreignKey: 'id', targetKey: "conversation_id_user", as: 'message'});
      // define association here
    }
  }
  conversation_user.init({
    conversation_id: DataTypes.BIGINT,
    sender_id: DataTypes.BIGINT,
    reciever_id: DataTypes.BIGINT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'conversation_user',
  });
  return conversation_user;
};