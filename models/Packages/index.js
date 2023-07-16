const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const Packages = sequelize.define(
  "dmn_packages",
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_domains: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, underscored: true, tableName: "dmn_packages" }
);

module.exports = Packages;
