const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL
  }, 
  {
    hooks: {
      beforeSave: async user => {
        if(user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      }
    }
  })

  User.prototype.generateToken = () => {
    return jwt.sign({
      id: this.id
    }, process.env.SECRET_JWT, { expiresIn: '10m' });
  }

  return User;
}