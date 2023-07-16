const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const UserReferenceDetail = sequelize.define(
  "dmn_users_reference_details",
  {
    refer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    campaign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      isUnique: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "dmn_users_reference_details",
  }
);

module.exports = UserReferenceDetail;
