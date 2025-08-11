import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqItems: FAQItem[] = [
    {
      question: 'How accurate is the weather data?',
      answer: 'Our weather data comes from reliable meteorological sources and weather stations worldwide, providing accuracy rates of 99.9% for current conditions and 85-90% for forecasts.'
    },
    {
      question: 'Can I track multiple cities?',
      answer: 'Yes! You can add unlimited cities to your favorites list and monitor weather conditions for all your important locations in one place.'
    },
    {
      question: 'Is my location data private?',
      answer: 'Absolutely. We only use your location to provide weather information and never store or share your personal location data with third parties.'
    },
    {
      question: 'How often is the weather data updated?',
      answer: 'Weather data is updated every 15-30 minutes to ensure you always have the most current information available.'
    },
    {
      question: 'Can I use WeatherPro offline?',
      answer: 'While real-time data requires an internet connection, recently viewed weather information is cached locally for quick access when you\'re offline.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'WeatherPro is designed as a responsive web application that works perfectly on all devices. A dedicated mobile app is planned for future release.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find answers to common questions about WeatherPro
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className={`card overflow-hidden animate-slide-in-up stagger-${index + 1}`}>
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.question}
                </h3>
                <div className="transform transition-transform duration-200 group-hover:scale-110">
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>
              {openItems.has(index) && (
                <div className="px-6 pb-4 animate-slide-down">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;