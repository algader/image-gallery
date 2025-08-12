# MongoDB Atlas Connection Fix for Railway

## Updated Connection String for Railway Variables:

MONGODB_URI=mongodb+srv://mohammad:ct7HOABJmtQEveKO@cluster0.zffy6vm.mongodb.net/photoapp?retryWrites=true&w=majority&ssl=true&authSource=admin&appName=Cluster0

## Alternative Connection String (if first doesn't work):

MONGODB_URI=mongodb+srv://mohammad:ct7HOABJmtQEveKO@cluster0.zffy6vm.mongodb.net/photoapp?retryWrites=true&w=majority&ssl=true&tlsInsecure=false&authMechanism=SCRAM-SHA-1&appName=Cluster0

## Alternative 2 (disable SSL verification temporarily):

MONGODB_URI=mongodb+srv://mohammad:ct7HOABJmtQEveKO@cluster0.zffy6vm.mongodb.net/photoapp?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true&appName=Cluster0

## Steps to fix in Railway:
1. Go to Railway Variables
2. Update MONGODB_URI with one of the strings above
3. Redeploy

## Additional Variables to ensure:
JWT_SECRET=my-super-secure-jwt-secret-key-2024-for-photo-gallery-app
NODE_ENV=production
