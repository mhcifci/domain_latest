const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const UserVerification = sequelize.define(
  "dmn_user_verification",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_success: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "dmn_user_verification" }
);

module.exports = UserVerification;
