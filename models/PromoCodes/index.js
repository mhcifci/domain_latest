const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const PromoCodes = sequelize.define(
  "dmn_promo_codes",
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "dmn_promo_codes" }
);

module.exports = PromoCodes;
