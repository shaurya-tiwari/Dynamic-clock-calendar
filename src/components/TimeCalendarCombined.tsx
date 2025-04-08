import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClockSettings } from '../types';

interface TimeCalendarCombinedProps {
  settings: ClockSettings;
  onBack: () => void;
}

type DisplayFormat = 'vertical' | 'horizontal' | 'cards';

const TimeCalendarCombined: React.FC<TimeCalendarCombinedProps> = ({ settings, onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>('vertical');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: settings.showSeconds ? '2-digit' : undefined,
      hour12: !settings.is24Hour
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days: React.ReactElement[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                     selectedDate.getMonth() === new Date().getMonth() &&
                     selectedDate.getFullYear() === new Date().getFullYear();
      const isSelected = day === selectedDate.getDate();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
            ${isToday ? 'bg-blue-500 text-white' : ''}
            ${isSelected ? 'ring-2 ring-blue-500' : ''}
            hover:bg-blue-100 dark:hover:bg-blue-900`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const renderTimeDisplay = () => {
    if (displayFormat === 'cards') {
      return (
        <div className="flex gap-2">
          {formatTime(currentTime).split(':').map((digit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-4xl font-bold">{digit}</span>
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <motion.div
        className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {formatTime(currentTime)}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="absolute top-4 left-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
        >
          Back
        </button>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setDisplayFormat('vertical')}
          className={`px-4 py-2 rounded-md transition-colors ${
            displayFormat === 'vertical' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          Vertical
        </button>
        <button
          onClick={() => setDisplayFormat('horizontal')}
          className={`px-4 py-2 rounded-md transition-colors ${
            displayFormat === 'horizontal' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          Horizontal
        </button>
        <button
          onClick={() => setDisplayFormat('cards')}
          className={`px-4 py-2 rounded-md transition-colors ${
            displayFormat === 'cards' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
        >
          Cards
        </button>
      </div>

      <div className={`flex ${displayFormat === 'vertical' ? 'flex-col' : 'flex-row'} gap-8 items-center`}>
        <div className="text-center">
          {renderTimeDisplay()}
          <div className="mt-4 text-xl text-gray-300">{formatDate(currentTime)}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              ←
            </button>
            <h2 className="text-xl font-semibold">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm text-gray-400">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeCalendarCombined; 