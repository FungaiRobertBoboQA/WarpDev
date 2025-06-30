module.exports = {
    validUser: {
      username: `testuser_${Date.now()}`,
      password: 'ValidPass123!',
      email: `test_${Date.now()}@example.com`
    },
    invalidUsers: [
      {
        username: 'inv@lid',
        password: 'short',
        email: 'not-an-email'
      },
      {
        username: 'a'.repeat(256),
        password: '',
        email: ''
      }
    ]
  };