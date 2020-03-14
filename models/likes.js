module.exports = function(sequelize, DataTypes) {
  const Likes = sequelize.define("Like", {
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Likes.associate = function(models) {
    Likes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Likes;
};
