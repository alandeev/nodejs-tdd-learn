const { User } = require('../app/models');

class UserRepository {
  _instance = null;
  constructor() {}

  static get instance() {
    if(!this._instance) {
      this._instance = new UserRepository();
    }

    return this._instance;
  }

  find(condition) {
    return User.find(condition)
  }

  findById(userId, condition) {
    return User.findById(userId, condition);
  }

  findByEmail(email) {
    return User.findOne({ 
      where: { email }
    })
  }
}

module.exports = UserRepository.instance;