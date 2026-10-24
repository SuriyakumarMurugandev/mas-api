
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authWrapper = require('./auth/authWrapper')

require('dotenv').config();

const app = express();

// ✅ Security headers
app.use(helmet());

// ✅ Enable CORS
app.use(cors());

// ✅ Logging (only for dev)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ Apply global auth handler
app.use(authWrapper);

// ✅ Routes
app.use('/api', require('./routes/route'));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
