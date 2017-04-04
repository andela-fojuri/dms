import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255]
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    password_digest: {
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          allowNull: false,
        });
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents'
        });
        // associations can be defined here
      }
    }
  });

  const hasSecurePassword = (user, options, callback) => {
    if (user.password !== user.password_confirmation) {
      throw new Error("Password confirmation doesn't match Password");
    }
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return callback(err);
      user.set('password_digest', hash);
      return callback(null, options);
    });
  };

  User.beforeCreate((user, options, callback) => {
    // user.update({ email: user.email.toLowerCase() });
    user.email = user.email.toLowerCase();
    if (user.password) {
      hasSecurePassword(user, options, callback);
    } else {
      return callback(null, options);
    }
  });

  User.beforeUpdate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    if (user.password) {
      hasSecurePassword(user, options, callback);
    } else {
      return callback(null, options);
    }
  });

  return User;
};
