const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node-js", "root", "pathak4477", {
  host: "localhost",
  dialect: "mysql",
});



(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

module.exports = sequelize;