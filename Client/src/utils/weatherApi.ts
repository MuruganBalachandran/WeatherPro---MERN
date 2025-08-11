import { weatherApi } from './api';

// Keep original interfaces for compatibility

export interface WeatherResponse {
  id: number;
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
  timezone: number;
  dt: number;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  try {
    // Use server API instead of direct OpenWeatherMap API
    const data = await weatherApi.getWeatherByCity(city);
    return {
      id: parseInt(data.id),
      name: data.city,
      sys: {
        country: data.country,
        sunrise: data.sunrise,
        sunset: data.sunset,
      },
      main: {
        temp: data.temperature,
        feels_like: data.feelsLike,
        humidity: data.humidity,
        pressure: data.pressure,
      },
      weather: [{
        main: data.condition,
        description: data.description,
        icon: data.icon,
      }],
      wind: {
        speed: data.windSpeed,
        deg: data.windDirection,
      },
      clouds: {
        all: data.cloudiness,
      },
      visibility: data.visibility * 1000, // Convert back to meters
      coord: {
        lat: data.coordinates.lat,
        lon: data.coordinates.lon,
      },
      timezone: data.timezone,
      dt: Math.floor(data.timestamp / 1000),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    // Use server API instead of direct OpenWeatherMap API
    const data = await weatherApi.getWeatherByCoordinates(lat, lon);
    return {
      id: parseInt(data.id),
      name: data.city,
      sys: {
        country: data.country,
        sunrise: data.sunrise,
        sunset: data.sunset,
      },
      main: {
        temp: data.temperature,
        feels_like: data.feelsLike,
        humidity: data.humidity,
        pressure: data.pressure,
      },
      weather: [{
        main: data.condition,
        description: data.description,
        icon: data.icon,
      }],
      wind: {
        speed: data.windSpeed,
        deg: data.windDirection,
      },
      clouds: {
        all: data.cloudiness,
      },
      visibility: data.visibility * 1000, // Convert back to meters
      coord: {
        lat: data.coordinates.lat,
        lon: data.coordinates.lon,
      },
      timezone: data.timezone,
      dt: Math.floor(data.timestamp / 1000),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      maximumAge: 300000,
    });
  });
};

export const transformWeatherData = (data: WeatherResponse) => ({
  id: data.id.toString(),
  city: data.name,
  country: data.sys.country,
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  condition: data.weather[0].main,
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  windSpeed: Math.round(data.wind.speed * 10) / 10,
  windDirection: data.wind.deg,
  cloudiness: data.clouds.all,
  visibility: Math.round(data.visibility / 1000), // Convert to km
  icon: data.weather[0].icon,
  description: data.weather[0].description,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  coordinates: {
    lat: data.coord.lat,
    lon: data.coord.lon,
  },
  timezone: data.timezone,
  timestamp: Date.now(),
});

export const getWeatherEffects = (condition: string) => {
  const effects = {
    sunny: ['sun', 'clear'],
    cloudy: ['clouds', 'overcast'],
    rainy: ['rain', 'drizzle', 'thunderstorm'],
    snowy: ['snow', 'sleet'],
  };

  const conditionLower = condition.toLowerCase();
  
  if (effects.sunny.some(effect => conditionLower.includes(effect))) return 'sunny';
  if (effects.rainy.some(effect => conditionLower.includes(effect))) return 'rainy';
  if (effects.snowy.some(effect => conditionLower.includes(effect))) return 'snowy';
  if (effects.cloudy.some(effect => conditionLower.includes(effect))) return 'cloudy';
  
  return 'clear';
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export const getPressureStatus = (pressure: number): string => {
  if (pressure < 1000) return 'Low';
  if (pressure > 1020) return 'High';
  return 'Normal';
};

export const getVisibilityStatus = (visibility: number): string => {
  if (visibility >= 10) return 'Excellent';
  if (visibility >= 5) return 'Good';
  if (visibility >= 2) return 'Moderate';
  return 'Poor';
};

export const getHumidityStatus = (humidity: number): string => {
  if (humidity < 30) return 'Dry';
  if (humidity > 70) return 'Humid';
  return 'Comfortable';
};