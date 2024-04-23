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
        task.belongsTo(models.User, {foreignKey: 'created_by', as: 'created_by_user'});
        task.belongsTo(models.User, {foreignKey: 'assign_to', as: 'assign_to_user'});
        task.belongsTo(models.project, {foreignKey: 'project', as: 'project_data'});

      // task.belongsToMany(models.User, {through: 'Users', foreignKey: 'observer', as: 'observer_users'})

       //task.belongsToMany(models.User, {through: 'tasks',foreignKey: 'project', constraints: true, as: 'observer_users'});
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