const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.validPassword = password => {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate(async (user, options) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  return User;
};
