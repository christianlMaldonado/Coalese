module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    password: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5 - 50],
    },
  });
  return User;
};
