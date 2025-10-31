// backend/models/vendorroute.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VendorRoute extends Model {
    static associate(models) {
      VendorRoute.belongsTo(models.Truck, { foreignKey: 'truckId', as: 'truck' });
      VendorRoute.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
      VendorRoute.hasMany(models.Booking, { foreignKey: 'routeId', as: 'bookings' });
    }
  }

  VendorRoute.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    truckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trucks',
        key: 'id'
      }
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id'
      }
    },
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dropLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availableDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    offeredPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available', 'booked', 'cancelled'),
      defaultValue: 'available'
    }
  }, {
    sequelize,
    modelName: 'VendorRoute',
    tableName: 'vendor_routes',
    timestamps: true,
    underscored: true
  });

  return VendorRoute;
};
