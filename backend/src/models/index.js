const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "database", 'user', 'password',
  { dialect: "postgres", host: "localhost" }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./userModel")(sequelize, DataTypes);
db.event = require("./eventModel")(sequelize, DataTypes);
db.user_event = require("./user_eventModel")(sequelize, DataTypes);

db.users.belongsToMany(db.event, { through: db.user_event, foreignKey: 'user_id' });
db.event.belongsToMany(db.users, { through: db.user_event, foreignKey: 'event_id' });

//exporting the module
module.exports = db;
