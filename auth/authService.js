const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseModel = require('../model/AppModel');
const UserModel = require('../modules/Users/UserModel') 

const userModel = BaseModel(UserModel);

const AuthService = {

  // ✅ REGISTER
  async register(data) {
    const { password, ...rest } = data;

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      ...rest,
      password: hashedPassword
    };

    const result = await userModel.create(userData);

    return result;
  },

  // ✅ LOGIN
  async login(email, password) {

    // ✅ get user
    const users = await userModel.query(
      `SELECT * FROM ${UserModel.table} WHERE email = ? AND active = 1 AND deleted = 0`,
      [email]
    );

    if (!users.length) {
      throw new Error('User not found');
    }

    const user = users[0];

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // ✅ create token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token
    };
  }

};

module.exports = AuthService;