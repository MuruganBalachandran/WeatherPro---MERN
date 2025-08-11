# WeatherPro - Weather Application

A modern weather application built with React, Node.js, and MongoDB.


[🚀 Live Demo](https://weatherpro-mern.onrender.com/)

## ✨ Features

- **🌤️ Real-time Weather Data** - Current weather and 5-day forecasts
- **🔐 User Authentication** - Secure login/registration system
- **❤️ Favorites Management** - Save and manage favorite locations
- **🎨 Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **📱 Mobile Responsive** - Works perfectly on all devices
- **🌍 Global Coverage** - Weather data for cities worldwide

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **OpenWeatherMap API** for weather data
- **Helmet** for security

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- OpenWeatherMap API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weatherpro.git
   cd weatherpro
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd Server && npm install
   
   # Frontend
   cd Client && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Server/.env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   OPENWEATHER_API_KEY=your-openweather-api-key
   CORS_ORIGINS=http://localhost:3000,http://localhost:5173
   
   # Client/.env
   VITE_API_URL=http://localhost:5000/api
   VITE_OPENWEATHER_API_KEY=your-openweather-api-key
   ```

4. **Run the application**
   ```bash
   # Backend (Terminal 1)
   cd Server && npm run dev
   
   # Frontend (Terminal 2)
   cd Client && npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy to Render

1. **Backend**: Create Web Service with Node.js runtime
2. **Frontend**: Create Static Site with build command
3. **Set environment variables** as specified in DEPLOYMENT.md
4. **Connect your GitHub repository** for auto-deployment

## 📁 Project Structure

```
WeatherPro/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # State management
│   │   └── utils/         # API utilities
│   └── package.json
├── Server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Express middleware
│   │   └── config/        # Configuration files
│   └── package.json
└── render.yaml            # Render deployment config
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/demo` - Demo account access

### Weather
- `GET /api/weather/city/:city` - Weather by city
- `GET /api/weather/coordinates` - Weather by coordinates
- `GET /api/weather/forecast/:city` - 5-day forecast

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `DELETE /api/user/account` - Delete account

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add favorite location
- `DELETE /api/favorites/:id` - Remove favorite

## 🧪 Testing

```bash
# Backend tests
cd Server && npm test

# Frontend build test
cd Client && npm run build
```

## 📝 Environment Variables

### Backend
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `CORS_ORIGINS` - Allowed CORS origins

### Frontend
- `VITE_API_URL` - Backend API URL
- `VITE_OPENWEATHER_API_KEY` - OpenWeatherMap API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling
- [Render](https://render.com/) for hosting

---

**Built with ❤️ by the WeatherPro Team**
