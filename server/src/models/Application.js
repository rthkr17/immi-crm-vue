module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        name: DataTypes.STRING,
        formtype: DataTypes.STRING,
        status: DataTypes.STRING,
        documents: DataTypes.JSON,
        lifespan: DataTypes.INTEGER,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        dob: DataTypes.STRING,
        pob: DataTypes.STRING,
        cob: DataTypes.STRING,
        gender: DataTypes.STRING,
    })
    return Application
}