module.exports = (sequelize, DataTypes) => {
  const Retainer = sequelize.define('Retainer', {
      consultant: DataTypes.STRING,
      consultantAcceptedDate: DataTypes.STRING,
      applicant: DataTypes.STRING,
      viewDate: DataTypes.STRING,
      applicantAcceptedDate: DataTypes.STRING,
      totalPayment: DataTypes.INTEGER,
      paidPayment: DataTypes.INTEGER,
      content: DataTypes.TEXT
  })
  return Retainer
}