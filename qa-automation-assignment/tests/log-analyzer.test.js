const { analyzeLogFile } = require('../utils/log-analyzer');
const { waitFor } = require('../utils/wait');
const fs = require('fs');
const path = require('path');

describe('Log Analyzer', () => {
  const testLogPath = path.join(__dirname, 'test.log');
  
  beforeAll(() => {
    // Setup test log file
    const testLog = `2023-05-01T10:00:00 - Login
2023-05-01T10:01:30 - ViewProfile
2023-05-01T10:02:15 - EditProfile
2023-05-01T10:05:00 - Logout
2023-05-01T10:10:00 - Login
2023-05-01T10:10:30 - ViewDashboard`;
    
    fs.writeFileSync(testLogPath, testLog);
  });
  
  afterAll(() => {
    // Cleanup
    if (fs.existsSync(testLogPath)) {
      fs.unlinkSync(testLogPath);
    }
  });
  
  test('should detect event sequences within time window', async () => {
    const targetPattern = ['Login', 'ViewProfile'];
    const results = await waitFor(() => {
      const r = analyzeLogFile(testLogPath, 5, targetPattern);
      return r.length > 0 ? r : null;
    });
    
    expect(results.length).toBe(1);
    expect(results[0].events).toEqual(targetPattern);
  });
  
  test('should handle large log files efficiently', () => {
    // Performance test would go here
  });
});