'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Game, { foreignKey: 'standId' });
    }
  }
  Stand.init(
    {
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Stand',
    }
  );
  return Stand;
};
