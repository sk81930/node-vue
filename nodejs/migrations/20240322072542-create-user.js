'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require ('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    let user = await queryInterface.createTable('Users', {
                  id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                  },
                  name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                  },
                  email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                  },
                  password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                  },
                  role: {
                    type:   Sequelize.ENUM,
                    values: ['admin', 'manager', 'user'],
                    defaultValue: "user"
                  },
                  createdAt: {
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNull: false
                  },
                  updatedAt: {
                    type: 'TIMESTAMP',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNull: false
                  }
                });
      const workFactor = 8;
      const password = "info@whizkraft.com"
      var password_d = await bcrypt.genSalt(workFactor)
                            .then(salt => {
                              return bcrypt.hash(password, salt);
                            })
                            .then(hash => {
                              console.log(`Hash2222: ${hash}`);
                              return hash;
                            })
                            .catch(err =>{ console.error(err.message); return null;});
      if(password_d) {

          await queryInterface.bulkInsert('Users', [{
              name: 'Admin',
              email: 'info@whizkraft.com',
              password: password_d,
            }]); 

      }                  
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};