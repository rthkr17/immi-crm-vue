module.exports = (sequelize, DataTypes) =>
    sequelize.define('Application', {
        apptype: {
            type: DataTypes.STRING,
        },
        applicantname: {
            type: DataTypes.STRING,
        }
    })