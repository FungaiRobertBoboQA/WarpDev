const APIClient = require('../../pages/api-client');
const config = require('../../config/config');
const testData = require('../../config/test-data');
const { validateResponseSchema } = require('../../utils/test-helpers');

describe('API Authentication', () => {
  let apiClient;

  beforeAll(() => {
    apiClient = new APIClient();
  });

  test('should authenticate admin user with valid credentials', async () => {
    await expect(apiClient.authenticate('admin')).resolves.toBe(true);
    expect(apiClient.token).toBeTruthy();
  });

  test('should reject invalid credentials', async () => {
    // Temporarily override client behavior for negative test
    const originalAuth = apiClient.authenticate;
    apiClient.authenticate = async () => {
      const response = await apiClient.request('POST', '/auth', {
        username: 'invalid',
        password: 'credentials'
      }, 401);
      return false;
    };
    
    await expect(apiClient.authenticate()).resolves.toBe(false);
    apiClient.authenticate = originalAuth;
  });

  test('should return valid token structure', async () => {
    await apiClient.authenticate();
    const tokenParts = apiClient.token.split('.');
    expect(tokenParts.length).toBe(3); // JWT has 3 parts
  });
});