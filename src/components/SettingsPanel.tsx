import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface SettingsPanelProps {
  settings: ClockSettings;
  setSettings: React.Dispatch<React.SetStateAction<ClockSettings>>;
  onClose: () => void;
  isPomodoroMode: boolean;
  togglePomodoroMode: () => void;
  toggleCardsMode: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  settings, 
  setSettings, 
  onClose,
  isPomodoroMode,
  togglePomodoroMode,
  toggleCardsMode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');
  const [customBgUrl, setCustomBgUrl] = useState('');
  const [fileInputRef] = useState(React.createRef<HTMLInputElement>());

  const backgrounds = [
    { name: 'Purple Gradient', value: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { name: 'Blue Ocean', value: 'bg-gradient-to-br from-blue-400 to-blue-800' },
    { name: 'Sunset Orange', value: 'bg-gradient-to-br from-orange-400 to-pink-600' },
    { name: 'Forest Green', value: 'bg-gradient-to-br from-green-400 to-green-700' },
    { name: 'Dark Mode', value: 'bg-gradient-to-br from-gray-800 to-gray-900' },
  ];

  const clockSizes = [
    { name: 'Small', value: 'sm' },
    { name: 'Medium', value: 'md' },
    { name: 'Large', value: 'lg' },
    { name: 'Extra Large', value: 'xl' },
  ];

  const clockColors = [
    { name: 'White', value: 'text-white' },
    { name: 'Light Gray', value: 'text-gray-200' },
    { name: 'Gold', value: 'text-yellow-300' },
    { name: 'Teal', value: 'text-teal-300' },
    { name: 'Pink', value: 'text-pink-300' },
  ];

  const fontFamilies = [
    { name: 'Sans Serif', value: 'font-sans' },
    { name: 'Serif', value: 'font-serif' },
    { name: 'Mono', value: 'font-mono' },
    { name: 'Poppins', value: 'font-[Poppins]' },
    { name: 'Montserrat', value: 'font-[Montserrat]' },
    { name: 'Roboto', value: 'font-[Roboto]' },
    { name: 'Playfair', value: 'font-[Playfair_Display]' },
    { name: 'Oswald', value: 'font-[Oswald]' },
    { name: 'Lato', value: 'font-[Lato]' },
    { name: 'Raleway', value: 'font-[Raleway]' },
  ];

  const applySettings = () => {
    if (customBgUrl) {
      setSettings({
        ...settings,
        backgroundImage: customBgUrl,
        background: ''
      });
      setCustomBgUrl('');
    }
  };

  const selectBackground = (bg: string) => {
    setSettings({
      ...settings,
      background: bg,
      backgroundImage: ''
    });
  };

  const toggleOption = (option: keyof ClockSettings) => {
    setSettings({
      ...settings,
      [option]: !settings[option]
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSettings({
            ...settings,
            backgroundImage: event.target.result.toString(),
            background: ''
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed left-4 top-4 z-50">
      <div className="relative">
        {/* Settings Icon Button */}
        <button 
          onClick={toggleExpand} 
          className="bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-black/40 transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Settings Panel */}
        {/* @ts-ignore */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-14 w-72 md:w-80 bg-black/80 backdrop-blur-lg rounded-lg shadow-2xl border border-white/10 text-white overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold">Settings</h2>
                <button 
                  onClick={toggleExpand}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  className={`flex-1 py-2 px-4 ${activeTab === 'appearance' ? 'bg-white/10 font-medium' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveTab('appearance')}
                >
                  Appearance
                </button>
                <button
                  className={`flex-1 py-2 px-4 ${activeTab === 'display' ? 'bg-white/10 font-medium' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveTab('display')}
                >
                  Display
                </button>
                <button
                  className={`flex-1 py-2 px-4 ${activeTab === 'mode' ? 'bg-white/10 font-medium' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveTab('mode')}
                >
                  Mode
                </button>
              </div>
              
              <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {activeTab === 'appearance' ? (
                  <div className="space-y-4">
                    {/* Background Settings */}
                    <div>
                      <h3 className="font-medium mb-2">Background</h3>
                      <div className="grid grid-cols-5 gap-2 mb-3">
                        {backgrounds.map((bg) => (
                          <button
                            key={bg.value}
                            onClick={() => selectBackground(bg.value)}
                            className={`w-full aspect-square rounded-md transition-all ${bg.value} ${settings.background === bg.value ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                            title={bg.name}
                          />
                        ))}
                      </div>
                      
                      {/* Background Image Upload */}
                      <div className="mb-3">
                        <button
                          onClick={triggerFileInput}
                          className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors"
                        >
                          Upload from Device
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex-grow border-t border-white/20"></div>
                        <span className="px-2 text-xs text-white/50">or</span>
                        <div className="flex-grow border-t border-white/20"></div>
                      </div>
                      
                      <div className="mb-3 flex">
                        <input
                          type="text"
                          value={customBgUrl}
                          onChange={(e) => setCustomBgUrl(e.target.value)}
                          placeholder="Enter image URL..."
                          className="flex-1 py-1.5 px-3 bg-white/10 rounded-l outline-none focus:ring-1 focus:ring-white/30 text-sm"
                        />
                        <button
                          onClick={applySettings}
                          className="py-1.5 px-3 bg-white/20 hover:bg-white/30 rounded-r text-sm transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    
                    {/* Clock Color */}
                    <div>
                      <h3 className="font-medium mb-2">Clock Color</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {clockColors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setSettings({ ...settings, clockColor: color.value })}
                            className={`py-1 rounded transition-all ${settings.clockColor === color.value ? 'bg-white/20 font-medium' : 'bg-white/5 hover:bg-white/10'}`}
                          >
                            <div className={`w-4 h-4 rounded-full mx-auto ${color.value.replace('text-', 'bg-')}`}></div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Font Family */}
                    <div>
                      <h3 className="font-medium mb-2">Font</h3>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {fontFamilies.map((font) => (
                          <button
                            key={font.value}
                            onClick={() => setSettings({ ...settings, fontFamily: font.value })}
                            className={`py-1.5 px-2 rounded text-sm transition-all ${settings.fontFamily === font.value ? 'bg-white/20 font-medium' : 'bg-white/5 hover:bg-white/10'}`}
                          >
                            <span className={font.value}>{font.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'display' ? (
                  <div className="space-y-4">
                    {/* Clock Size */}
                    <div>
                      <h3 className="font-medium mb-2">Clock Size</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {clockSizes.map((size) => (
                          <button
                            key={size.value}
                            onClick={() => setSettings({ ...settings, clockSize: size.value })}
                            className={`py-1.5 px-2 rounded text-sm transition-all ${settings.clockSize === size.value ? 'bg-white/20 font-medium' : 'bg-white/5 hover:bg-white/10'}`}
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Orientation */}
                    <div>
                      <h3 className="font-medium mb-2">Orientation</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSettings({ ...settings, orientation: 'horizontal' })}
                          className={`py-1.5 px-3 rounded text-sm transition-all flex items-center justify-center gap-2 ${settings.orientation === 'horizontal' ? 'bg-white/20 font-medium' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                          </svg>
                          Horizontal
                        </button>
                        <button
                          onClick={() => setSettings({ ...settings, orientation: 'vertical' })}
                          className={`py-1.5 px-3 rounded text-sm transition-all flex items-center justify-center gap-2 ${settings.orientation === 'vertical' ? 'bg-white/20 font-medium' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                          </svg>
                          Vertical
                        </button>
                      </div>
                    </div>
                    
                    {/* Display Options */}
                    <div>
                      <h3 className="font-medium mb-2">Show/Hide</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-white/5 rounded p-2">
                          <span className="text-sm">Show Seconds</span>
                          <button
                            onClick={() => toggleOption('showSeconds')}
                            className={`w-10 h-5 rounded-full relative transition-colors ${settings.showSeconds ? 'bg-blue-500' : 'bg-white/20'}`}
                          >
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${settings.showSeconds ? 'transform translate-x-5' : ''}`}></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between bg-white/5 rounded p-2">
                          <span className="text-sm">Show Date</span>
                          <button
                            onClick={() => toggleOption('showDate')}
                            className={`w-10 h-5 rounded-full relative transition-colors ${settings.showDate ? 'bg-blue-500' : 'bg-white/20'}`}
                          >
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${settings.showDate ? 'transform translate-x-5' : ''}`}></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Mode Toggles */}
                    <div>
                      <h3 className="font-medium mb-3">Clock Mode</h3>
                      <div className="space-y-3">
                        <button
                          onClick={togglePomodoroMode}
                          className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-md shadow-md transition-all flex items-center justify-between"
                        >
                          <span className="font-medium">{isPomodoroMode ? 'Switch to Clock' : 'Switch to Pomodoro'}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        
                        {!isPomodoroMode && (
                          <button
                            onClick={toggleCardsMode}
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 rounded-md shadow-md transition-all flex items-center justify-between"
                          >
                            <span className="font-medium">{settings.useCardsMode ? 'Switch to Simple Mode' : 'Switch to Cards Mode'}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Info Section */}
                    <div className="bg-white/5 rounded-md p-3 mt-4">
                      <h3 className="font-medium text-sm mb-2">About Clock App</h3>
                      <p className="text-xs text-white/70">A customizable clock and pomodoro timer application with beautiful design options and various display modes.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsPanel; 