// backend/models/shipment.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    static associate(models) {
      Shipment.belongsTo(models.Consignee, { foreignKey: 'consigneeId', as: 'consignee' });
      Shipment.hasMany(models.Booking, { foreignKey: 'shipmentId', as: 'bookings' });
    }
  }

  Shipment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    consigneeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'consignees',
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
    productCategory: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    totalWeight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'in kg'
    },
    totalVolume: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'in cubic meters'
    },
    pickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'matched', 'booked', 'in_transit', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Shipment',
    tableName: 'shipments',
    timestamps: true,
    underscored: true
  });

  return Shipment;
};
