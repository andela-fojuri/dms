

export default (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    access: {
      type: DataTypes.ENUM('Public', 'Private', 'Role'),
      defaultValue: 'Public',
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          allowNull: false,
        });
          // associations can be defined here
      }
    }
  });

  return Document;
};
