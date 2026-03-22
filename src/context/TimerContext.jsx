import React, { createContext, useState, useEffect, useRef } from 'react';

export const TimerContext = createContext();

const DEFAULT_TIMES = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export const TimerProvider = ({ children }) => {
  const [mode, setMode] = useState('work');
  const [customTimes, setCustomTimes] = useState(() => {
    const saved = localStorage.getItem('timerSettings');
    return saved ? JSON.parse(saved) : DEFAULT_TIMES;
  });
  const [timeLeft, setTimeLeft] = useState(customTimes.work);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);
  const stopwatchIntervalRef = useRef(null);
  const stopwatchEndTimeRef = useRef(null);

  useEffect(() => {
    // Reset timer when mode or custom times change
    if (!isRunning) {
      setTimeLeft(customTimes[mode]);
    }
  }, [mode, customTimes, isRunning]);

  useEffect(() => {
    localStorage.setItem('timerSettings', JSON.stringify(customTimes));
  }, [customTimes]);

  useEffect(() => {
    if (isRunning) {
      // Calculate precise end time
      endTimeRef.current = Date.now() + timeLeft * 1000;
      
      intervalRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          handleTimerComplete();
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isStopwatchRunning) {
      // Precise counting up
      stopwatchEndTimeRef.current = Date.now() - stopwatchTime * 1000;
      
      stopwatchIntervalRef.current = setInterval(() => {
        const elapsed = Math.max(0, Math.round((Date.now() - stopwatchEndTimeRef.current) / 1000));
        setStopwatchTime(elapsed);
      }, 1000);
    }

    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    };
  }, [isStopwatchRunning]);

  const handleTimerComplete = () => {
    playSound();
    if (mode === 'work') {
      const nextCycles = cycles + 1;
      setCycles(nextCycles);
      if (nextCycles % 4 === 0) {
        setMode('long');
      } else {
        setMode('short');
      }
    } else {
      setMode('work');
    }
  };

  const playSound = () => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, context.currentTime); // D5
      oscillator.frequency.setValueAtTime(659.25, context.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, context.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(customTimes[mode]);
  };

  const skipTimer = () => {
    setIsRunning(false);
    handleTimerComplete();
  };

  const toggleStopwatch = () => {
    setIsStopwatchRunning(prev => !prev);
  };

  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    setStopwatchTime(0);
  };

  const handleInputChange = (key, value) => {
    const mins = parseInt(value, 10) || 1;
    setCustomTimes(prev => ({
      ...prev,
      [key]: mins * 60
    }));
  };

  const applyPreset = (preset) => {
    setCustomTimes({
      work: preset.work * 60,
      short: preset.short * 60,
      long: preset.long * 60
    });
  };

  return (
    <TimerContext.Provider value={{
      mode, setMode,
      customTimes, setCustomTimes,
      timeLeft, setTimeLeft,
      isRunning, setIsRunning,
      cycles, setCycles,
      toggleTimer, resetTimer, skipTimer,
      handleInputChange, applyPreset,
      // Stopwatch values
      stopwatchTime, setStopwatchTime,
      isStopwatchRunning, setIsStopwatchRunning,
      toggleStopwatch, resetStopwatch
    }}>
      {children}
    </TimerContext.Provider>
  );
};
