const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const Users = sequelize.define(
  "dmn_users",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
  },
  { timestamps: true, underscored: true, tableName: "dmn_users" }
);

module.exports = Users;
