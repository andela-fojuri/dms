
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'roleId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleId',
        },
        allowNull: false,
      });
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'roleId');
  }
};
