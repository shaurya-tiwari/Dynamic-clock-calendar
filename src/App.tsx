import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClockComponent from './components/ClockComponent';
import PomodoroTimer from './components/PomodoroTimer';
import SettingsPanel from './components/SettingsPanel';
import TimeCalendarCombined from './components/TimeCalendarCombined';
import { ClockSettings } from './types';
import './App.css';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPomodoroMode, setIsPomodoroMode] = useState(false);
  const [isCalendarMode, setIsCalendarMode] = useState(false);
  const [isTimeCalendarMode, setIsTimeCalendarMode] = useState(false);
  const [settings, setSettings] = useState<ClockSettings>({
    background: 'gradient',
    backgroundImage: '',
    clockSize: 'medium',
    clockColor: '#ffffff',
    fontFamily: 'Arial',
    showSeconds: true,
    showDate: true,
    orientation: 'horizontal',
    useCardsMode: false,
    is24Hour: false,
    showPomodoro: false,
    isVertical: false,
    useDepthEffect: false,
    selectedFont: 'Arial',
    clockFace: 'classic'
  });

  const handleSettingsChange = (newSettings: Partial<ClockSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const togglePomodoroMode = () => {
    setIsPomodoroMode(prev => !prev);
    if (!isPomodoroMode) {
      setIsCalendarMode(false);
      setIsTimeCalendarMode(false);
    }
  };

  const toggleCalendarMode = () => {
    setIsCalendarMode(prev => !prev);
    if (!isCalendarMode) {
      setIsPomodoroMode(false);
      setIsTimeCalendarMode(false);
    }
  };

  const toggleTimeCalendarMode = () => {
    setIsTimeCalendarMode(prev => !prev);
    if (!isTimeCalendarMode) {
      setIsPomodoroMode(false);
      setIsCalendarMode(false);
    }
  };

  const toggleCardsMode = () => {
    setSettings(prev => ({
      ...prev,
      useCardsMode: !prev.useCardsMode
    }));
  };

  const getBackgroundClass = () => {
    if (settings.backgroundImage) {
      return '';
    }
    return settings.background === 'gradient' 
      ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
      : settings.background;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Clock App
          </h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="relative">
          {isTimeCalendarMode && (
            <motion.div
              key="time-calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <TimeCalendarCombined
                settings={settings}
                onBack={() => setIsTimeCalendarMode(false)}
              />
            </motion.div>
          )}
          {isPomodoroMode && (
            <motion.div
              key="pomodoro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <PomodoroTimer
                settings={settings}
                onBack={() => setIsPomodoroMode(false)}
              />
            </motion.div>
          )}
          {!isTimeCalendarMode && !isPomodoroMode && (
            <motion.div
              key="clock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0"
            >
              <ClockComponent settings={settings} />
            </motion.div>
          )}
        </div>

        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SettingsPanel
              settings={settings}
              setSettings={setSettings}
              onClose={() => setIsSettingsOpen(false)}
              isPomodoroMode={isPomodoroMode}
              togglePomodoroMode={togglePomodoroMode}
              isCalendarMode={isCalendarMode}
              toggleCalendarMode={toggleCalendarMode}
              isTimeCalendarMode={isTimeCalendarMode}
              toggleTimeCalendarMode={toggleTimeCalendarMode}
              toggleCardsMode={toggleCardsMode}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
