# Railway Deployment Configuration

# Railway will automatically detect this is a Node.js project
# and run the start script from package.json

# Environment Variables needed on Railway:
# - MONGODB_URI: MongoDB Atlas connection string
# - JWT_SECRET: Your JWT secret key
# - NODE_ENV: production
# - PORT: (Railway sets this automatically)

# Railway will automatically:
# 1. Install dependencies (npm install)
# 2. Build the project if needed
# 3. Start the server using "npm start"

# The server will be available at:
# https://your-app-name.up.railway.app

# Make sure your server.js listens on process.env.PORT:
# const PORT = process.env.PORT || 5000;
# app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
