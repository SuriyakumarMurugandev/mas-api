const AuthService = require('./authService');
const response = require('../Responses/Response');

exports.register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    res.json(response.success(result, 'User registered'));
  } catch (err) {
    res.json(response.error('Register failed', err.message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await AuthService.login(email, password);

    res.json(response.success(data, 'Login successful'));
  } catch (err) {
    res.json(response.error('Login failed', err.message));
  }
};