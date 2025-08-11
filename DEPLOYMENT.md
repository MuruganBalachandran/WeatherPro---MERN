# WeatherPro - Render Deployment Guide

## 🚀 Quick Deploy to Render

### 1. Backend Deployment

1. **Create a new Web Service** in Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `weatherpro-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd Server && npm install`
   - **Start Command**: `cd Server && npm start`
   - **Plan**: Free

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/weatherpro?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   OPENWEATHER_API_KEY=your-openweather-api-key-here
   CORS_ORIGINS=https://your-frontend-app-name.onrender.com
   ```

### 2. Frontend Deployment

1. **Create a new Static Site** in Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `weatherpro-frontend`
   - **Build Command**: `cd Client && npm install && npm run build`
   - **Publish Directory**: `Client/dist`
   - **Plan**: Free

4. **Set Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-app-name.onrender.com/api
   VITE_OPENWEATHER_API_KEY=your-openweather-api-key-here
   ```

## 🔧 Manual Deployment Steps

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd Server
   npm install --production
   ```

2. **Set environment variables** (see above)

3. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd Client
   npm install
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Serve the build:**
   ```bash
   npm run preview
   ```

## 🌍 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
OPENWEATHER_API_KEY=your-api-key
CORS_ORIGINS=https://your-frontend-domain.onrender.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
VITE_OPENWEATHER_API_KEY=your-api-key
```

## 📋 Prerequisites

1. **MongoDB Atlas account** with a cluster
2. **OpenWeatherMap API key**
3. **GitHub repository** with your code
4. **Render account** (free tier available)

## 🔒 Security Considerations

1. **Use strong JWT secrets**
2. **Set proper CORS origins**
3. **Use environment variables** for sensitive data
4. **Enable rate limiting**
5. **Use HTTPS** (automatic on Render)

## 🚨 Common Issues & Solutions

### Backend Issues
- **Port binding**: Ensure PORT env var is set
- **CORS errors**: Check CORS_ORIGINS configuration
- **Database connection**: Verify MONGODB_URI format

### Frontend Issues
- **API calls failing**: Check VITE_API_URL
- **Build errors**: Ensure all dependencies are installed
- **Routing issues**: Verify base path in Vite config

## 📊 Monitoring

- **Health check**: `/api/health` endpoint
- **Render logs**: Available in Render dashboard
- **Error tracking**: Check browser console and server logs

## 🔄 Updates & Maintenance

1. **Push changes** to GitHub
2. **Render auto-deploys** on push to main branch
3. **Monitor deployment** in Render dashboard
4. **Check health endpoint** after deployment

## 📞 Support

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **OpenWeatherMap API**: https://openweathermap.org/api

---

**Happy Deploying! 🎉**
