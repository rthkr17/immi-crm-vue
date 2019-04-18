module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    staffTime: DataTypes.TIME,
    applicantTime: DataTypes.TIME,
    applicant: DataTypes.STRING,
    consultant: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    selectTime: DataTypes.TIME
  })
  // Schedule.prototpye.setTimezones = async function (time) {
  //   return {
  //     staffTime = staffTime.tz('America/Los_Angeles').format('ha z'),
  //     applicantTime = applicantTime.tz('America/Los_Angeles').format('ha z')
  //   }
  // }
  return Schedule
}