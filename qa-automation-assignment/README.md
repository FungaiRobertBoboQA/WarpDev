## Code Execution  
### Prerequisites  
- Node.js v18+  
- Docker (for containerized tests)  

### Installation  
```bash
git clone [your-repo-url]
cd qa-automation-assignment
npm install
cp .env.example .env  # Update values

### To Run All Tests
npm test


npm run test:api      # API tests only
npm run test:logs     # Log analyzer tests