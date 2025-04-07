import React, { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  settings: {
    clockColor: string;
    fontFamily: string;
    backgroundImage?: string;
    orientation?: 'horizontal' | 'vertical';
    useCardsMode?: boolean;
  };
  onBack: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ settings, onBack }) => {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 mins in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(0);
  const [focusTime, setFocusTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  
  // Handle timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Switch modes and reset timer
      const newMode = mode === 'focus' ? 'break' : 'focus';
      setMode(newMode);
      
      if (newMode === 'focus') {
        setRounds(prev => prev + 1);
        setTimeLeft(focusTime * 60);
      } else {
        setTimeLeft(breakTime * 60);
      }
      
      // Play notification sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, focusTime, breakTime]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(focusTime * 60);
    setRounds(0);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = mode === 'focus' 
    ? 1 - (timeLeft / (focusTime * 60)) 
    : 1 - (timeLeft / (breakTime * 60));
  
  return (
    <div className={`w-full max-w-xl flex flex-col items-center ${settings.fontFamily}`}>
      <h2 className={`${settings.clockColor} text-3xl font-bold mb-8`}>
        Pomodoro Timer
      </h2>
      
      <div className="w-72 h-72 md:w-80 md:h-80 relative flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full shadow-ios">
        {/* Progress circle */}
        <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={mode === 'focus' ? 'rgba(239,68,68,0.8)' : 'rgba(34,211,238,0.8)'}
            strokeWidth="8"
            strokeDasharray="100 100"
            strokeDashoffset={100 - (progress * 100)}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        
        <div className="z-10 flex flex-col items-center justify-center">
          <div className={`text-6xl font-bold ${settings.clockColor}`}>
            {formatTime(timeLeft)}
          </div>
          <div className={`text-xl font-medium mt-2 ${settings.clockColor} capitalize`}>
            {mode} Mode
          </div>
          <div className={`text-sm mt-2 ${settings.clockColor}`}>
            Round {rounds + 1}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-full backdrop-blur-sm ${
            isRunning 
              ? 'bg-red-500/80 text-white' 
              : 'bg-green-500/80 text-white'
          } font-medium shadow-ios hover:brightness-110 transition-all`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm text-white font-medium shadow-ios hover:bg-white/30 transition-all"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-8 w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-ios">
        <h3 className={`${settings.clockColor} text-xl font-semibold mb-4`}>Timer Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block ${settings.clockColor} mb-2`}>Focus Time (min)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={focusTime}
              onChange={(e) => setFocusTime(parseInt(e.target.value))}
              className="w-full bg-white/20 backdrop-blur-sm rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={isRunning}
            />
          </div>
          <div>
            <label className={`block ${settings.clockColor} mb-2`}>Break Time (min)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakTime}
              onChange={(e) => setBreakTime(parseInt(e.target.value))}
              className="w-full bg-white/20 backdrop-blur-sm rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer; 