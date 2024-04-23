'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       task_comment.belongsTo(models.User, {foreignKey: 'created_by', as: 'created_by_user'});
      // define association here
    }
  }
  task_comment.init({
    taskid: DataTypes.BIGINT,
    comment: DataTypes.TEXT,
    attachments: DataTypes.JSON,
    created_by: DataTypes.BIGINT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task_comment',
  });
  return task_comment;
};