
export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    category: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users',
        });
      },
    },
  });
  return Role;
};
