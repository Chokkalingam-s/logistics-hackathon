// backend/models/truck.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    static associate(models) {
      Truck.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
      Truck.hasMany(models.VendorRoute, { foreignKey: 'truckId', as: 'routes' });
    }
  }

  Truck.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id'
      }
    },
    registrationNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    truckType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    maxWeightCapacity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'in tons'
    },
    length: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      comment: 'in meters'
    },
    width: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    volumeCapacity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'in cubic meters'
    },
    currentStatus: {
      type: DataTypes.ENUM('available', 'booked', 'inactive'),
      defaultValue: 'available'
    }
  }, {
    sequelize,
    modelName: 'Truck',
    tableName: 'trucks',
    timestamps: true,
    underscored: true
  });

  return Truck;
};
