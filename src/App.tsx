import React, { useState } from 'react';
import ClockComponent from './components/ClockComponent';
import PomodoroTimer from './components/PomodoroTimer';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

interface ClockSettings {
  background: string;
  backgroundImage: string;
  clockSize: string;
  clockColor: string;
  fontFamily: string;
  showSeconds: boolean;
  showDate: boolean;
  orientation: 'horizontal' | 'vertical';
  useCardsMode: boolean;
}

const App: React.FC = () => {
  const [isPomodoroMode, setIsPomodoroMode] = useState(false);
  const [settings, setSettings] = useState<ClockSettings>({
    background: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    backgroundImage: '',
    clockSize: 'md',
    clockColor: 'text-white',
    fontFamily: 'font-sans',
    showSeconds: true,
    showDate: true,
    orientation: 'horizontal',
    useCardsMode: false
  });

  // Create dynamic style for background image if one is set
  const backgroundStyle = settings.backgroundImage 
    ? { 
        backgroundImage: `url(${settings.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } 
    : {};

  const togglePomodoroMode = () => {
    setIsPomodoroMode(!isPomodoroMode);
  };

  const toggleCardsMode = () => {
    setSettings({
      ...settings,
      useCardsMode: !settings.useCardsMode
    });
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center transition-all duration-500 ${settings.backgroundImage ? '' : settings.background}`}
      style={backgroundStyle}
    >
      {/* Settings Panel - Now positioned in the left corner with all toggles */}
      <SettingsPanel 
        settings={settings} 
        setSettings={setSettings} 
        onClose={() => {}}
        isPomodoroMode={isPomodoroMode}
        togglePomodoroMode={togglePomodoroMode}
        toggleCardsMode={toggleCardsMode}
      />

      <div className="relative flex flex-col items-center justify-center w-full max-w-7xl px-4">
        {isPomodoroMode ? (
          <PomodoroTimer settings={settings} onBack={() => setIsPomodoroMode(false)} />
        ) : (
          <ClockComponent settings={settings} />
        )}
      </div>
    </div>
  );
}

export default App;
