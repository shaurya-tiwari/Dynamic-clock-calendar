import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

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

interface ClockComponentProps {
  settings: ClockSettings;
}

// Digit component for each number in text mode
const Digit: React.FC<{
  digit: string;
  size: string;
  color: string;
  fontFamily: string;
}> = ({ digit, size, color, fontFamily }) => {
  const sizeClasses = {
    sm: 'text-6xl',
    md: 'text-7xl',
    lg: 'text-8xl',
    xl: 'text-9xl'
  };

  return (
    <span className={`${sizeClasses[size as keyof typeof sizeClasses]} ${color} ${fontFamily} font-bold mx-0.5`}>
      {digit}
    </span>
  );
};

// Group Digit component that shows two digits together in text mode
const GroupDigit: React.FC<{
  digits: string;
  size: string;
  color: string;
  fontFamily: string;
}> = ({ digits, size, color, fontFamily }) => {
  const sizeClasses = {
    sm: 'text-6xl',
    md: 'text-7xl',
    lg: 'text-8xl',
    xl: 'text-9xl'
  };

  return (
    <span className={`${sizeClasses[size as keyof typeof sizeClasses]} ${color} ${fontFamily} font-bold mx-0.5`}>
      {digits}
    </span>
  );
};

// Card digit component for a pair of digits in cards mode
const CardGroupDigit: React.FC<{
  digits: string;
  size: string;
  color: string;
  fontFamily: string;
  label?: string;
}> = ({ digits, size, color, fontFamily, label }) => {
  const sizeClasses = {
    sm: 'text-5xl h-16 w-28',
    md: 'text-6xl h-20 w-32',
    lg: 'text-7xl h-24 w-40',
    xl: 'text-8xl h-28 w-48'
  };

  return (
    <div className="relative mx-2 rounded-xl overflow-hidden group">
      {/* Enhanced glassmorphism card */}
      <div className={`${sizeClasses[size as keyof typeof sizeClasses]} backdrop-blur-md bg-white/10 shadow-lg flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-white/15 border border-white/20 group-hover:border-white/30 rounded-xl`}>
        <div className={`${color} ${fontFamily} font-bold tracking-wider`}>
          {digits}
        </div>
        {label && (
          <div className={`${color} text-xs font-medium mt-1 opacity-70`}>
            {label}
          </div>
        )}

        {/* Internal glassmorphism effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/1 pointer-events-none"></div>
        <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
      </div>
    </div>
  );
};

// Separator component (colon)
const Separator: React.FC<{
  color: string;
  fontFamily: string;
  size: string;
  orientation: 'horizontal' | 'vertical';
}> = ({ color, fontFamily, size, orientation }) => {
  const sizeClasses = {
    sm: 'text-5xl',
    md: 'text-6xl',
    lg: 'text-7xl',
    xl: 'text-8xl'
  };

  return (
    <span className={`${sizeClasses[size as keyof typeof sizeClasses]} ${color} ${fontFamily} font-bold mx-3 ${orientation === 'vertical' ? 'my-2' : ''}`}>
      {orientation === 'vertical' ? (
        <span className="inline-block">..</span>
      ) : (
        <span>:</span>
      )}
    </span>
  );
};

// Card separator component (colon)
const CardSeparator: React.FC<{
  color: string;
  fontFamily: string;
  size: string;
  orientation: 'horizontal' | 'vertical';
}> = ({ color, fontFamily, size, orientation }) => {
  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'text-5xl h-16' : 'text-3xl h-16',
    md: orientation === 'horizontal' ? 'text-6xl h-20' : 'text-4xl h-16',
    lg: orientation === 'horizontal' ? 'text-7xl h-24' : 'text-5xl h-20',
    xl: orientation === 'horizontal' ? 'text-8xl h-28' : 'text-6xl h-24'
  };

  // Use appropriate separator character based on orientation
  const separatorChar = orientation === 'vertical' ? '⋮' : ':';

  return (
    <div className={`${sizeClasses[size as keyof typeof sizeClasses]} flex items-center justify-center mx-3 ${orientation === 'vertical' ? 'my-4 px-0' : 'px-2'}`}>
      <span className={`${color} ${fontFamily} font-bold text-opacity-80`}>
        {separatorChar}
      </span>
    </div>
  );
};

const ClockComponent: React.FC<ClockComponentProps> = ({ settings }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = format(time, 'hh');
  const minutes = format(time, 'mm');
  const seconds = format(time, 'ss');
  const ampm = format(time, 'a');
  const formattedDate = format(time, 'EEEE, MMMM d, yyyy');
  const weekday = format(time, 'EEEE');

  const containerClass = settings.orientation === 'vertical'
    ? 'flex-col space-y-4'
    : 'flex-row';

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {settings.showDate && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-6 text-xl ${settings.clockColor} ${settings.fontFamily} ${settings.useCardsMode ? 'backdrop-blur-md' : ''} bg-black/20 px-6 py-2 rounded-full shadow-lg ${settings.useCardsMode ? 'border border-white/20' : ''}`}
        >
          {formattedDate}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center"
      >
        <div className={`flex ${containerClass} items-center`}>
          {/* Hours */}
          {settings.useCardsMode ? (
            <CardGroupDigit
              digits={hours}
              size={settings.clockSize}
              color={settings.clockColor}
              fontFamily={settings.fontFamily}
              label="HOURS"
            />
          ) : (
            <GroupDigit
              digits={hours}
              size={settings.clockSize}
              color={settings.clockColor}
              fontFamily={settings.fontFamily}
            />
          )}

          {/* Separator */}
          {settings.useCardsMode ? (
            <CardSeparator
              color={settings.clockColor}
              fontFamily={settings.fontFamily}
              size={settings.clockSize}
              orientation={settings.orientation}
            />
          ) : (
            <Separator
              color={settings.clockColor}
              fontFamily={settings.fontFamily}
              size={settings.clockSize}
              orientation={settings.orientation}
            />
          )}

          {/* Minutes */}
          {settings.useCardsMode ? (
            <CardGroupDigit
              digits={minutes}
              size={settings.clockSize}
              color={settings.clockColor}
              fontFamily={settings.fontFamily}
              label="MINUTES"
            />
          ) : (
            <GroupDigit
              digits={minutes}
              size={settings.clockSize}
              color={settings.clockColor}
              fontFamily={settings.fontFamily}
            />
          )}

          {/* Seconds */}
          {settings.showSeconds && (
            <>
              {settings.useCardsMode ? (
                <CardSeparator
                  color={settings.clockColor}
                  fontFamily={settings.fontFamily}
                  size={settings.clockSize}
                  orientation={settings.orientation}
                />
              ) : (
                <Separator
                  color={settings.clockColor}
                  fontFamily={settings.fontFamily}
                  size={settings.clockSize}
                  orientation={settings.orientation}
                />
              )}

              {settings.useCardsMode ? (
                <CardGroupDigit
                  digits={seconds}
                  size={settings.clockSize}
                  color={settings.clockColor}
                  fontFamily={settings.fontFamily}
                  label="SECONDS"
                />
              ) : (
                <GroupDigit
                  digits={seconds}
                  size={settings.clockSize}
                  color={settings.clockColor}
                  fontFamily={settings.fontFamily}
                />
              )}
            </>
          )}

          {/* AM/PM */}
          <div className={`ml-2 ${settings.clockColor} ${settings.fontFamily} text-2xl font-bold ${settings.useCardsMode ? 'bg-white/10 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-white/20' : ''}`}>
            {ampm}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`mt-6 text-lg ${settings.clockColor} ${settings.fontFamily} opacity-80`}
      >
        {weekday}
      </motion.div>
    </div>
  );
};

export default ClockComponent; 