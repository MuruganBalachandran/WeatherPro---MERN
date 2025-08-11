# WeatherPro Server

A robust Node.js/Express backend server for the WeatherPro weather application.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Demo user access
  - Password hashing with bcrypt
  - Protected routes middleware

- **User Management**
  - User profiles with customizable settings
  - Password change functionality
  - Account deactivation
  - User statistics

- **Weather API Integration**
  - OpenWeatherMap API integration
  - Current weather by city or coordinates
  - 5-day weather forecast
  - City search functionality
  - Weather data transformation

- **Favorites System**
  - Save favorite weather locations
  - Manage favorite locations
  - Weather data caching for favorites
  - Favorites statistics

- **Security & Performance**
  - Helmet.js for security headers
  - CORS configuration
  - Rate limiting
  - Input validation with express-validator
  - Error handling middleware
  - Request logging with Morgan

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- OpenWeatherMap API key

### Installation

1. **Clone and navigate to server directory**
   ```bash
   cd Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/weatherpro
   JWT_SECRET=your-super-secret-jwt-key
   OPENWEATHER_API_KEY=your-openweathermap-api-key
   CORS_ORIGINS=http://localhost:5173
   ```

4. **Get OpenWeatherMap API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Add it to your `.env` file

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

6. **Run the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /demo` - Demo user login
- `POST /logout` - User logout

### User Management (`/api/user`)

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /password` - Change password
- `DELETE /account` - Deactivate account
- `GET /stats` - Get user statistics

### Weather (`/api/weather`)

- `GET /city/:city` - Get weather by city name
- `GET /coordinates?lat=&lon=` - Get weather by coordinates
- `GET /forecast/:city` - Get 5-day forecast
- `GET /search?q=` - Search cities
- `GET /conditions` - Get weather conditions

### Favorites (`/api/favorites`)

- `GET /` - Get user's favorites
- `POST /` - Add location to favorites
- `GET /:id` - Get specific favorite
- `PUT /:id` - Update favorite
- `DELETE /:id` - Remove favorite
- `POST /refresh` - Refresh weather data
- `GET /stats` - Get favorites statistics

### Health Check

- `GET /api/health` - Server health status

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Demo User

For testing purposes, you can use the demo login:
- Email: `demo@weatherpro.com`
- Password: `demo123`

Or use the demo endpoint: `POST /api/auth/demo`

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Get Weather
```bash
GET /api/weather/city/London
Authorization: Bearer <token>
```

### Add to Favorites
```bash
POST /api/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "city": "London",
  "country": "GB",
  "coordinates": {
    "lat": 51.5074,
    "lon": -0.1278
  }
}
```

## Error Handling

The API returns structured error responses:

```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "details": [...] // Optional validation details
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  location: String,
  temperatureUnit: String ('C' | 'F'),
  isActive: Boolean,
  lastLogin: Date,
  favorites: [ObjectId],
  timestamps: true
}
```

### Favorite Model
```javascript
{
  userId: ObjectId,
  city: String,
  country: String,
  coordinates: { lat: Number, lon: Number },
  weatherData: {
    temperature: Number,
    condition: String,
    icon: String,
    humidity: Number,
    windSpeed: Number,
    lastUpdated: Date
  },
  isActive: Boolean,
  timestamps: true
}
```

## Configuration

### Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)
- `RATE_LIMIT_WINDOW_MS` - Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window

### Rate Limiting

Default rate limiting is set to 100 requests per 15 minutes per IP address.

## Development

### Project Structure
```
src/
├── config/
│   └── database.js          # Database connection
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User model
│   └── Favorite.js          # Favorite model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── user.js              # User management routes
│   ├── weather.js           # Weather API routes
│   └── favorites.js         # Favorites routes
└── index.js                 # Main server file
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not yet implemented)

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Configure reverse proxy (nginx)
6. Set up SSL/TLS certificates
7. Configure environment-specific rate limits
8. Set up monitoring and logging

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet.js
- MongoDB injection protection
- Error message sanitization

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Write descriptive commit messages
5. Test all endpoints before submitting

## License

This project is licensed under the MIT License.
