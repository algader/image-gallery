# MongoDB Local Setup (Temporary Solution)

## If you can't access MongoDB Atlas free tier:

### Option 1: Use Local MongoDB
1. Install MongoDB locally on your Mac:
   ```bash
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. In Railway Variables, use:
   ```
   MONGODB_URI=mongodb://localhost:27017/photoapp
   ```

### Option 2: Use Railway's Built-in Database
Railway offers PostgreSQL for free:

1. In Railway Dashboard:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will provide connection details automatically

2. Modify your code to use PostgreSQL instead of MongoDB
   (This requires code changes)

### Option 3: Try Alternative Free MongoDB Services:

1. **Clever Cloud MongoDB:**
   - https://www.clever-cloud.com/
   - Free 256MB MongoDB

2. **FaunaDB:**
   - https://fauna.com/
   - Free tier available
   - NoSQL like MongoDB

### Option 4: MongoDB Atlas Alternative Steps:

1. Go to: https://cloud.mongodb.com/
2. Click "Build a Database"
3. Select "Shared" (not Dedicated)
4. Look for "FREE" label
5. Choose M0 Shared cluster

## Railway Variables for Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/photoapp
JWT_SECRET=my-secret-key-2024
NODE_ENV=production
```

Note: Local MongoDB won't work on Railway deployment,
but you can use it for local development.
