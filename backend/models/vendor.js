// backend/models/vendor.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      Vendor.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Vendor.hasMany(models.Truck, { foreignKey: 'vendorId', as: 'trucks' });
      Vendor.hasMany(models.VendorRoute, { foreignKey: 'vendorId', as: 'routes' });
      Vendor.hasMany(models.Booking, { foreignKey: 'vendorId', as: 'bookings' });
    }
  }

  Vendor.init({
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
    pan: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    kycStatus: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Vendor',
    tableName: 'vendors',
    timestamps: true,
    underscored: true
  });

  return Vendor;
};
