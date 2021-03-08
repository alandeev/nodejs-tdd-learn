const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/UserRepository');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: "fields are required" });
    }

    const user = await userRepository.findByEmail(email);
    if(!user) {
      return res.status(401).json({ error: "user not found" });
    }

    if(!(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "password is invalid" });
    }

    const token = user.generateToken();

    res.status(200).json({ token });
  }
}


module.exports = new SessionController();