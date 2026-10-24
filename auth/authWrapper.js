const { authenticate } = require('./middleware');
const publicRoutes = require('../routes/public');

const authWrapper = (req, res, next) => {
  const reqPath = req.path;

  // ✅ Check if request matches public routes
  const isPublic = publicRoutes.some(route =>
    reqPath.startsWith(route)
  );

  if (isPublic) {
    return next(); // ✅ Skip authentication
  }

  // ✅ Otherwise apply auth
  return authenticate(req, res, next);
};

module.exports = authWrapper;