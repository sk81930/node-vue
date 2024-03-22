const {Sequelize, DataTypes} = require("sequelize");
const config = require("./config.json");
const db = config.development;

const sequelize = new Sequelize(
    db.database,
    db.username,
    db.password,
    {
      host:  db.host,
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connected database: '+db.database);
}).catch((error) => {
   console.error('Unable to connect to the database: ', error.message);
});