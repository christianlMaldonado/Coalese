module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define("Like", {
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return Like;
};
