import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, CheckCircle, AlertTriangle, Info, X, Lightbulb } from 'lucide-react';
import { WeatherData } from '../../redux/favoritesSlice';
import { aiApi } from '../../utils/api';

interface ActivityChatbotProps {
  weather: WeatherData;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'success' | 'warning' | 'info';
}

interface ActivityThresholds {
  temperature: { min: number; max: number };
  humidity: { max: number };
  windSpeed: { max: number };
  visibility: { min: number };
  description: string;
}

const ActivityChatbot: React.FC<ActivityChatbotProps> = ({ weather }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your assistant for ${weather.city}. Ask me about any activity or any question at all!` ,
      isBot: true,
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const activityThresholds: Record<string, ActivityThresholds> = {
    cricket: {
      temperature: { min: 20, max: 32 },
      humidity: { max: 80 },
      windSpeed: { max: 7 },
      visibility: { min: 5 },
      description: 'Cricket requires moderate temperatures, low wind, and good visibility for optimal play.'
    },
    football: {
      temperature: { min: 10, max: 30 },
      humidity: { max: 85 },
      windSpeed: { max: 10 },
      visibility: { min: 3 },
      description: 'Football can be played in various conditions but extreme weather should be avoided.'
    },
    soccer: {
      temperature: { min: 10, max: 30 },
      humidity: { max: 85 },
      windSpeed: { max: 10 },
      visibility: { min: 3 },
      description: 'Soccer can be played in various conditions but extreme weather should be avoided.'
    },
    cycling: {
      temperature: { min: 5, max: 35 },
      humidity: { max: 90 },
      windSpeed: { max: 15 },
      visibility: { min: 2 },
      description: 'Cycling requires good visibility and manageable wind conditions for safety.'
    },
    hiking: {
      temperature: { min: 0, max: 35 },
      humidity: { max: 95 },
      windSpeed: { max: 20 },
      visibility: { min: 1 },
      description: 'Hiking can be done in various weather but visibility and extreme conditions matter.'
    },
    running: {
      temperature: { min: -5, max: 30 },
      humidity: { max: 85 },
      windSpeed: { max: 15 },
      visibility: { min: 2 },
      description: 'Running is possible in most conditions but extreme heat or cold should be avoided.'
    },
    tennis: {
      temperature: { min: 15, max: 35 },
      humidity: { max: 75 },
      windSpeed: { max: 8 },
      visibility: { min: 5 },
      description: 'Tennis requires calm conditions with minimal wind for fair play.'
    },
    golf: {
      temperature: { min: 10, max: 35 },
      humidity: { max: 80 },
      windSpeed: { max: 12 },
      visibility: { min: 5 },
      description: 'Golf requires good visibility and moderate wind conditions for accurate play.'
    },
    swimming: {
      temperature: { min: 22, max: 40 },
      humidity: { max: 90 },
      windSpeed: { max: 20 },
      visibility: { min: 1 },
      description: 'Swimming outdoors is best in warm weather with minimal wind for comfort.'
    },
    basketball: {
      temperature: { min: 5, max: 35 },
      humidity: { max: 85 },
      windSpeed: { max: 15 },
      visibility: { min: 3 },
      description: 'Basketball can be played in most conditions but extreme weather affects performance.'
    },
    movie: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Movies are perfect indoor entertainment regardless of weather conditions!'
    },
    movies: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Movies are perfect indoor entertainment regardless of weather conditions!'
    },
    shopping: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Shopping malls and stores provide perfect indoor activities for any weather.'
    },
    reading: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Reading is a wonderful indoor activity perfect for any weather condition.'
    },
    cooking: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Cooking is a great indoor activity that works perfectly regardless of weather.'
    },
    gaming: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Gaming is an excellent indoor entertainment option for any weather condition.'
    },
    games: {
      temperature: { min: -10, max: 45 },
      humidity: { max: 100 },
      windSpeed: { max: 50 },
      visibility: { min: 0 },
      description: 'Gaming is an excellent indoor entertainment option for any weather condition.'
    },
    picnic: {
      temperature: { min: 18, max: 28 },
      humidity: { max: 70 },
      windSpeed: { max: 10 },
      visibility: { min: 5 },
      description: 'Picnics require pleasant weather with minimal wind and no rain for enjoyment.'
    },
    photography: {
      temperature: { min: -5, max: 40 },
      humidity: { max: 90 },
      windSpeed: { max: 25 },
      visibility: { min: 2 },
      description: 'Photography can work in various conditions, though extreme weather may affect equipment.'
    },
    gardening: {
      temperature: { min: 10, max: 30 },
      humidity: { max: 85 },
      windSpeed: { max: 15 },
      visibility: { min: 3 },
      description: 'Gardening is best in mild weather conditions without strong winds or extreme temperatures.'
    }
  };

  // Initial suggestion questions
  const suggestionQuestions = [
    'Is this weather good for cricket?',
    'What can I do indoors today?',
    'Summarize the current weather',
    'Is it good weather for a picnic?',
    'Tell me a fun fact',
    'How windy is it now?'
  ];

  const detectActivity = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    for (const activity of Object.keys(activityThresholds)) {
      if (lowerText.includes(activity)) {
        return activity;
      }
    }
    return null;
  };

  const checkActivitySuitability = (activity: string): { suitable: boolean; message: string; type: 'success' | 'warning' | 'info' } => {
    const thresholds = activityThresholds[activity];
    if (!thresholds) {
      return {
        suitable: false,
        message: `I don't have specific guidelines for ${activity}. Try asking about sports, indoor activities, or entertainment options!`,
        type: 'info'
      };
    }

    // Indoor activities are always suitable
    const indoorActivities = ['movie', 'movies', 'shopping', 'reading', 'cooking', 'gaming', 'games'];
    if (indoorActivities.includes(activity)) {
      return {
        suitable: true,
        message: `✅ Perfect choice! ${activity.charAt(0).toUpperCase() + activity.slice(1)} is an excellent indoor activity that's perfect regardless of the weather outside. Current conditions in ${weather.city}: ${weather.temperature}°C, ${weather.description}. Enjoy your ${activity}!`,
        type: 'success'
      };
    }

    const issues: string[] = [];
    const positives: string[] = [];

    // Check temperature
    if (weather.temperature < thresholds.temperature.min) {
      issues.push(`Temperature is too cold (${weather.temperature}°C, ideal: ${thresholds.temperature.min}-${thresholds.temperature.max}°C)`);
    } else if (weather.temperature > thresholds.temperature.max) {
      issues.push(`Temperature is too hot (${weather.temperature}°C, ideal: ${thresholds.temperature.min}-${thresholds.temperature.max}°C)`);
    } else {
      positives.push(`Temperature is perfect (${weather.temperature}°C)`);
    }

    // Check humidity
    if (weather.humidity > thresholds.humidity.max) {
      issues.push(`Humidity is too high (${weather.humidity}%, ideal: ≤${thresholds.humidity.max}%)`);
    } else {
      positives.push(`Humidity is comfortable (${weather.humidity}%)`);
    }

    // Check wind speed
    if (weather.windSpeed > thresholds.windSpeed.max) {
      issues.push(`Wind is too strong (${weather.windSpeed} m/s, ideal: ≤${thresholds.windSpeed.max} m/s)`);
    } else {
      positives.push(`Wind conditions are good (${weather.windSpeed} m/s)`);
    }

    // Check visibility
    if (weather.visibility < thresholds.visibility.min) {
      issues.push(`Visibility is poor (${weather.visibility} km, ideal: ≥${thresholds.visibility.min} km)`);
    } else {
      positives.push(`Visibility is excellent (${weather.visibility} km)`);
    }

    // Check for rain
    const isRainy = weather.condition.toLowerCase().includes('rain') || 
                   weather.description.toLowerCase().includes('rain');
    if (isRainy && activity !== 'hiking') {
      issues.push('Current rain conditions may affect outdoor activities');
    }

    const suitable = issues.length === 0;
    
    let message = '';
    if (suitable) {
      message = `✅ Yes! The weather is excellent for ${activity}!\n\n`;
      message += `Positive conditions:\n${positives.map(p => `• ${p}`).join('\n')}`;
      message += `\n\n${thresholds.description}`;
      return { suitable: true, message, type: 'success' };
    } else {
      message = `⚠️ The weather may not be ideal for ${activity}.\n\n`;
      message += `Concerns:\n${issues.map(i => `• ${i}`).join('\n')}`;
      if (positives.length > 0) {
        message += `\n\nGood conditions:\n${positives.map(p => `• ${p}`).join('\n')}`;
      }
      message += `\n\n${thresholds.description}`;
      
      // Suggest indoor alternatives for outdoor activities
      if (issues.length > 2) {
        message += `\n\n💡 Consider indoor alternatives like movies, shopping, reading, or gaming instead!`;
      }
      
      return { suitable: false, message, type: 'warning' };
    }
  };

  const getWeatherDetailsResponse = (): { message: string; type: 'success' | 'warning' | 'info' } => {
    const temp = weather.temperature;
    const isRainy = weather.condition.toLowerCase().includes('rain') || weather.description.toLowerCase().includes('rain');
    const isWindy = weather.windSpeed > 15;
    const isHumid = weather.humidity > 80;
    
    let message = `🌤️ **Current Weather in ${weather.city}:**\n\n`;
    message += `🌡️ Temperature: ${weather.temperature}°C (feels like ${weather.feelsLike}°C)\n`;
    message += `☁️ Condition: ${weather.description}\n`;
    message += `💧 Humidity: ${weather.humidity}%\n`;
    message += `💨 Wind: ${weather.windSpeed} m/s\n`;
    message += `👁️ Visibility: ${weather.visibility} km\n`;
    message += `📊 Pressure: ${weather.pressure} hPa\n\n`;
    
    message += `📋 **Plan Accordingly:**\n\n`;
    
    // Temperature recommendations
    if (temp < 5) {
      message += `🧥 Very cold weather - dress warmly in layers, consider indoor activities\n`;
    } else if (temp < 15) {
      message += `🧤 Cool weather - light jacket recommended, good for brisk activities\n`;
    } else if (temp < 25) {
      message += `👕 Pleasant temperature - perfect for most outdoor activities\n`;
    } else if (temp < 35) {
      message += `☀️ Warm weather - stay hydrated, seek shade during peak hours\n`;
    } else {
      message += `🔥 Very hot - limit outdoor exposure, stay indoors during midday\n`;
    }
    
    // Weather condition recommendations
    if (isRainy) {
      message += `☔ Rainy conditions - carry umbrella, consider indoor activities\n`;
    }
    
    if (isWindy) {
      message += `💨 Windy conditions - secure loose items, be cautious outdoors\n`;
    }
    
    if (isHumid) {
      message += `💧 High humidity - expect slower cooling, drink plenty of water\n`;
    }
    
    // Activity suggestions based on weather
    message += `\n🎯 **Recommended Activities:**\n`;
    
    if (isRainy || temp < 5 || temp > 35) {
      message += `• Indoor: Movies, shopping, reading, cooking, gaming\n`;
      message += `• Cozy activities: Hot drinks, board games, indoor workouts\n`;
    } else if (temp >= 20 && temp <= 30 && !isWindy) {
      message += `• Outdoor: Sports, picnics, hiking, cycling, photography\n`;
      message += `• Perfect for: Cricket, tennis, golf, running\n`;
    } else {
      message += `• Moderate outdoor activities: Walking, light sports\n`;
      message += `• Indoor alternatives: Gym, shopping, entertainment\n`;
    }
    
    return {
      message,
      type: temp >= 15 && temp <= 30 && !isRainy ? 'success' : 'info'
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Process the message
    const activity = detectActivity(textToSend);

    if (activity) {
      const result = checkActivitySuitability(activity);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: result.message,
        isBot: true,
        timestamp: new Date(),
        type: result.type
      };
      setTimeout(() => setMessages(prev => [...prev, botResponse]), 400);
    } else {
      // General Q&A through AI endpoint with fallback
      const typingId = (Date.now() + 2).toString();
      const typingMessage: Message = {
        id: typingId,
        text: 'Thinking...'
        , isBot: true,
        timestamp: new Date(),
        type: 'info'
      };
      setIsThinking(true);
      setMessages(prev => [...prev, typingMessage]);

      try {
        const answer = await aiApi.chat({ message: textToSend, weather });
        const botResponse: Message = {
          id: (Date.now() + 3).toString(),
          text: answer,
          isBot: true,
          timestamp: new Date(),
          type: 'info'
        };
        // Replace the typing message with the final answer
        setMessages(prev => prev.filter(m => m.id !== typingId).concat(botResponse));
      } catch (_err) {
        // Fallback to local weather guidance
        const result = getWeatherDetailsResponse();
        const botResponse: Message = {
          id: (Date.now() + 3).toString(),
          text: result.message,
          isBot: true,
          timestamp: new Date(),
          type: result.type
        };
        setMessages(prev => prev.filter(m => m.id !== typingId).concat(botResponse));
      } finally {
        setIsThinking(false);
      }
    }

    if (!messageText) {
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bot className="h-4 w-4 text-primary-500" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={handleToggleChat}
        className="bg-gradient-primary text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative group"
        title="Assistant"
      >
        <MessageCircle className="h-6 w-6" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
        <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-primary text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Assistant</h3>
                <p className="text-xs text-blue-100">Ask about anything</p>
              </div>
            </div>
            <button onClick={handleToggleChat} className="p-1 hover:bg-white/20 rounded transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'bg-gradient-primary text-white'}`}>
                  <div className="flex items-start space-x-2">
                    {message.isBot && <div className="mt-1">{getMessageIcon(message.type)}</div>}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    {!message.isBot && <User className="h-4 w-4 mt-1" />}
                  </div>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Try asking:</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {suggestionQuestions.map((suggestion, index) => (
                    <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="text-left p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isThinking ? 'Please wait…' : 'Ask me anything…'}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                disabled={isThinking}
              />
              <button onClick={() => handleSendMessage()} disabled={!inputText.trim() || isThinking} className="bg-gradient-primary text-white p-2 rounded-lg hover:bg-gradient-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityChatbot;