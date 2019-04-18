const bcrypt = require('bcrypt')

function hashPassword (user) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
    return
    }

    return bcrypt
        .genSalt(SALT_FACTOR)
        .then(salt => bcrypt.hash(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}