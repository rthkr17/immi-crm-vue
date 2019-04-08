module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    assignedApplicants: DataTypes.JSON,
    assignedStaff: DataTypes.JSON
  })
  return Staff
}