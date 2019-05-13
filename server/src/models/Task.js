module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    regarding: DataTypes.STRING,
    assignto: DataTypes.STRING,
    applicant: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT
  })
  return Task
}