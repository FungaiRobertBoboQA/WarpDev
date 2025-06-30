require('dotenv').config();

module.exports = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    timeout: parseInt(process.env.API_TIMEOUT) || 5000,
  },
  auth: {
    admin: {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    },
    user: {
      username: process.env.USER_USERNAME || 'user',
      password: process.env.USER_PASSWORD || 'user123'
    }
  },
  thresholds: {
    responseTime: parseInt(process.env.RESPONSE_TIME_THRESHOLD) || 1000,
    errorRate: parseFloat(process.env.ERROR_RATE_THRESHOLD) || 0.05
  }
};