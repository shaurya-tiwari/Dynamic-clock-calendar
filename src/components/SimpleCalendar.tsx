import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockSettings } from '../types';

interface SimpleCalendarProps {
  settings: ClockSettings;
  onBack: () => void;
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({ settings, onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderCalendarDays = () => {
    const days: React.ReactElement[] = [];
    const totalDays = 42; // 6 rows * 7 days

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const isToday = isCurrentMonth && 
        dayNumber === new Date().getDate() && 
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();
      const isSelected = selectedDate && 
        dayNumber === selectedDate.getDate() && 
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();

      days.push(
        <motion.div
          key={i}
          className={`
            aspect-square flex items-center justify-center rounded-lg
            ${isCurrentMonth ? 'cursor-pointer hover:bg-white/10' : 'opacity-50'}
            ${isToday ? 'bg-white/20' : ''}
            ${isSelected ? 'bg-white/30 ring-2 ring-white' : ''}
          `}
          whileHover={isCurrentMonth ? { scale: 1.1 } : {}}
          whileTap={isCurrentMonth ? { scale: 0.95 } : {}}
          onClick={() => isCurrentMonth && handleDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber))}
        >
          <span className={`text-sm ${settings.clockColor}`}>
            {isCurrentMonth ? dayNumber : ''}
          </span>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="text-white/80 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="text-white text-xl">←</span>
              </button>
              <h2 className={`text-xl font-semibold ${settings.clockColor}`}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="text-white text-xl">→</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-white/70"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>

          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white/10 rounded-lg"
            >
              <p className={`text-center ${settings.clockColor}`}>
                Selected: {selectedDate.toLocaleDateString()}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleCalendar; 