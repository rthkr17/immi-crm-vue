module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      status: DataTypes.STRING,
      email: DataTypes.STRING,
      timezone: DataTypes.STRING,
      monday:DataTypes.STRING,
      tuesday:DataTypes.STRING,
      wednesday:DataTypes.STRING,
      thursday:DataTypes.STRING,
      friday:DataTypes.STRING,
      saturday:DataTypes.STRING,
      sunday:DataTypes.STRING
  })
  return UserProfile
}