"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user, options) => {
  const hash = await bcrypt.hash(user.password, 16.5);
  user.email = user.email.toLowerCase();
  user.password = hash;
});

(async () => {
  await sequelize.sync({
    force: false,
  });
})();

module.exports = User;
