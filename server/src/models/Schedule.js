module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    staffTime: DataTypes.STRING,
    applicantTime: DataTypes.STRING,
    applicant: DataTypes.JSON,
    consultant: DataTypes.STRING,
    duration: DataTypes.JSON,
    selectTime: DataTypes.STRING
  })
  // Schedule.prototpye.setTimezones = async function (time) {
  //   return {
  //     staffTime = staffTime.tz('America/Los_Angeles').format('ha z'),
  //     applicantTime = applicantTime.tz('America/Los_Angeles').format('ha z')
  //   }
  // }
  return Schedule
}