const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');
const { retry } = require('../utils/test-helpers');

class APIClient {
  constructor() {
    this.instance = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout
    });
    this.token = null;
  }

  async authenticate(role = 'user') {
    const credentials = config.auth[role] || config.auth.user;
    
    return retry(async () => {
      try {
        const response = await this.instance.post('/auth', credentials);
        this.token = response.data.token;
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        logger.info(`Successfully authenticated as ${role}`);
        return true;
      } catch (error) {
        logger.error(`Authentication failed for ${role}: ${error.message}`);
        throw error;
      }
    }, 3);
  }

  async request(method, endpoint, data = null, expectedStatus = 200) {
    try {
      const response = await this.instance({
        method,
        url: endpoint,
        data
      });

      if (response.status !== expectedStatus) {
        logger.warn(`Unexpected status code: ${response.status} (expected ${expectedStatus})`);
      }

      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
        duration: response.duration
      };
    } catch (error) {
      if (error.response && error.response.status === expectedStatus) {
        return {
          status: error.response.status,
          data: error.response.data
        };
      }
      throw error;
    }
  }
}

module.exports = APIClient;