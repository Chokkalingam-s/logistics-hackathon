// backend/models/consignee.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Consignee extends Model {
    static associate(models) {
      Consignee.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Consignee.hasMany(models.Shipment, { foreignKey: 'consigneeId', as: 'shipments' });
    }
  }

  Consignee.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gstin: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    kycStatus: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Consignee',
    tableName: 'consignees',
    timestamps: true,
    underscored: true
  });

  return Consignee;
};
