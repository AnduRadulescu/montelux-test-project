module.exports = (sequelize, DataTypes) => {
  const User_Event = sequelize.define(
    "user_event",
    {
      user_event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "user_event" }
  );
  return User_Event;
};
