const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const Domains = sequelize.define(
  "dmn_domains",
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_banned: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true, tableName: "dmn_domains" }
);

module.exports = Domains;
