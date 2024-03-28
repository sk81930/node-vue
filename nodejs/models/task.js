'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    project: DataTypes.BIGINT,
    assign_to: DataTypes.BIGINT,
    observer: DataTypes.JSON,
    priority: DataTypes.STRING,
    created_by: DataTypes.BIGINT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};