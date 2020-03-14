'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('recipients', 'address_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'address',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('recipients', 'address_id');
  },
};
