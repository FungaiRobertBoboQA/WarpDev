async function retry(fn, maxAttempts = 3, delay = 1000) {
    let attempt = 1;
    let lastError;
  
    while (attempt <= maxAttempts) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
        attempt++;
      }
    }
  
    throw lastError;
  }
  
  function validateResponseSchema(response, schema) {
    // Implementation using a library like Joi or ajv
    // Would validate the response structure against the expected schema
  }
  
  module.exports = {
    retry,
    validateResponseSchema
  };