module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    content: DataTypes.STRING,
    applicant: DataTypes.JSON
  })
  return Message
}