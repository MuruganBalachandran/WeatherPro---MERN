#!/bin/bash

echo "🚀 WeatherPro Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Building frontend..."
cd Client
npm install
npm run build
cd ..

echo "📦 Building backend..."
cd Server
npm install --production
cd ..

echo "✅ Build complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Create a new Web Service in Render for the backend"
echo "3. Create a new Static Site in Render for the frontend"
echo "4. Set environment variables in Render"
echo "5. Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
