module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        status: DataTypes.STRING,
        documents: DataTypes.JSON,
        lifespan: DataTypes.INTEGER,
        // formtype: DataTypes.STRING,
        // firstname: DataTypes.STRING,
        // lastname: DataTypes.STRING,
        // email: DataTypes.STRING,
        // dob: DataTypes.DATEONLY,
        // pob: DataTypes.STRING,
        // cob: DataTypes.STRING,
        // gender: DataTypes.STRING,
    })
    return Application
}