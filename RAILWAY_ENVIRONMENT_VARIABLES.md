# Railway Environment Variables Configuration

## Required Environment Variables for Railway Deployment:

### 1. MONGODB_URI
Description: MongoDB Atlas connection string
Example: mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/photoapp?retryWrites=true&w=majority

Steps to get MongoDB URI:
1. Go to https://www.mongodb.com/atlas/database
2. Create free account and cluster (M0 Sandbox)
3. Create database user:
   - Username: admin
   - Password: (choose a strong password)
4. Get connection string:
   - Connect → Connect your application
   - Copy the connection string
   - Replace <password> with your actual password
   - Replace <database> with: photoapp

### 2. JWT_SECRET
Description: Secret key for JSON Web Token encryption
Example: my-super-secret-jwt-key-2024-make-it-very-long-and-random-for-security
Note: Make it long and random for security

### 3. NODE_ENV
Description: Environment mode
Value: production

### 4. PORT (Optional)
Description: Server port
Value: 5000
Note: Railway sets this automatically, but you can specify it

## How to add variables in Railway:
1. Go to your Railway project dashboard
2. Click on "Variables" tab
3. Add each variable with its value
4. Click "Deploy" to apply changes

## Sample Environment Variables:
```
MONGODB_URI=mongodb+srv://admin:mypassword123@cluster0.abc123.mongodb.net/photoapp?retryWrites=true&w=majority
JWT_SECRET=my-ultra-secure-jwt-secret-key-2024-make-it-long-and-random
NODE_ENV=production
```

## Database Name Suggestion:
Database Name: photoapp
Collection Names: users, images

## Security Notes:
- Never share your MongoDB password
- Use a strong, unique JWT_SECRET
- Keep environment variables private
