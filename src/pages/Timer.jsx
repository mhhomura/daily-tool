import React, { useState, useEffect } from 'react';
import { TimerContext } from '../context/TimerContext';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import SettingsIcon from '@mui/icons-material/Settings';

import {
  TimerContainer,
  DualLayout,
  TimerCard,
  ModeSelector,
  ModeButton,
  CircularProgress,
  TimeDisplay,
  Controls,
  ActionButton,
  CycleCounter,
  SettingsButton,
  SettingsPanel,
  FormGroup,
  StyledLabel,
  StyledInput,
  PresetGroup,
  PresetButton
} from './TimerStyles';

const DEFAULT_TIMES = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const PRESETS = [
  { name: 'Classic', work: 25, short: 5, long: 15 },
  { name: 'Extended', work: 50, short: 10, long: 15 },
  { name: 'Micro', work: 10, short: 2, long: 5 },
];

function Timer() {
  const [themeMode, setThemeMode] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    mode, setMode,
    customTimes,
    timeLeft,
    isRunning,
    cycles,
    toggleTimer, resetTimer, skipTimer,
    handleInputChange, applyPreset,
    stopwatchTime, isStopwatchRunning,
    toggleStopwatch, resetStopwatch
  } = React.useContext(TimerContext);

  useEffect(() => {
    setThemeMode(localStorage.getItem('theme') || 'light');
  }, [localStorage.getItem('theme')]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = customTimes[mode];
  const progress = (timeLeft / totalDuration) * 100;

  const stopwatchProgress = ((stopwatchTime % 60) / 60) * 100;

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <TimerContainer>
        <DualLayout>
          <TimerCard>
          <h2>Pomodoro Timer</h2>
          
          <ModeSelector>
            <ModeButton 
              active={mode === 'work'} 
              theme={currentTheme}
              onClick={() => { setMode('work'); resetTimer(); }}
            >
              Work
            </ModeButton>
            <ModeButton 
              active={mode === 'short'} 
              theme={currentTheme}
              onClick={() => { setMode('short'); resetTimer(); }}
            >
              Short Break
            </ModeButton>
            <ModeButton 
              active={mode === 'long'} 
              theme={currentTheme}
              onClick={() => { setMode('long'); resetTimer(); }}
            >
              Long Break
            </ModeButton>
          </ModeSelector>

          <CircularProgress 
            progress={progress} 
            theme={currentTheme} 
            color={mode === 'work' ? '#f44336' : '#4caf50'}
            isRunning={isRunning}
          >
            <TimeDisplay>{formatTime(timeLeft)}</TimeDisplay>
          </CircularProgress>

          <Controls>
            <ActionButton 
              color={isRunning ? '#ff9800' : '#4caf50'} 
              onClick={toggleTimer}
            >
              {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
              {isRunning ? 'Pause' : 'Start'}
            </ActionButton>
            
            <ActionButton color="#f44336" onClick={resetTimer}>
              <RefreshIcon /> Reset
            </ActionButton>

            <ActionButton color="#9e9e9e" onClick={skipTimer}>
              <SkipNextIcon /> Skip
            </ActionButton>
          </Controls>

          <CycleCounter>
            Completed Cycles: <strong>{cycles}</strong>
          </CycleCounter>

          <SettingsButton theme={currentTheme} onClick={() => setShowSettings(!showSettings)}>
            <SettingsIcon style={{ fontSize: '1rem' }} /> Settings
          </SettingsButton>

          <SettingsPanel show={showSettings} theme={currentTheme}>
            <FormGroup>
              <StyledLabel theme={currentTheme}>Work (minutes):</StyledLabel>
              <StyledInput 
                type="number" 
                min="1" 
                max="60"
                color={currentTheme.activeButton}
                value={customTimes.work / 60} 
                onChange={(e) => handleInputChange('work', e.target.value)}
                theme={currentTheme}
              />
            </FormGroup>
            <FormGroup>
              <StyledLabel theme={currentTheme}>Short Break (minutes):</StyledLabel>
              <StyledInput 
                type="number" 
                min="1" 
                max="30"
                color={currentTheme.activeButton}
                value={customTimes.short / 60} 
                onChange={(e) => handleInputChange('short', e.target.value)}
                theme={currentTheme}
              />
            </FormGroup>
            <FormGroup>
              <StyledLabel theme={currentTheme}>Long Break (minutes):</StyledLabel>
              <StyledInput 
                type="number" 
                min="1" 
                max="45"
                color={currentTheme.activeButton}
                value={customTimes.long / 60} 
                onChange={(e) => handleInputChange('long', e.target.value)}
                theme={currentTheme}
              />
            </FormGroup>

            <StyledLabel style={{ marginTop: '5px', textAlign: 'left' }} theme={currentTheme}>Presets:</StyledLabel>
            <PresetGroup>
              {PRESETS.map((preset) => (
                <PresetButton
                  key={preset.name}
                  active={
                    customTimes.work === preset.work * 60 &&
                    customTimes.short === preset.short * 60 &&
                    customTimes.long === preset.long * 60
                  }
                  theme={currentTheme}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.name}
                </PresetButton>
              ))}
            </PresetGroup>
          </SettingsPanel>
          </TimerCard>

          {/* Stopwatch */}
          <TimerCard>
            <h2>Stopwatch</h2>
            <div style={{ height: '52px', marginBottom: '2rem' }}></div>

            <CircularProgress 
              progress={stopwatchProgress} 
              theme={currentTheme} 
              color="#2196f3"
              isRunning={isStopwatchRunning}
            >
              <TimeDisplay>{formatTime(stopwatchTime)}</TimeDisplay>
            </CircularProgress>

            <Controls>
              <ActionButton 
                color={isStopwatchRunning ? '#ff9800' : '#4caf50'} 
                onClick={toggleStopwatch}
              >
                {isStopwatchRunning ? <PauseIcon /> : <PlayArrowIcon />}
                {isStopwatchRunning ? 'Pause' : 'Start'}
              </ActionButton>
              
              <ActionButton color="#f44336" onClick={resetStopwatch}>
                <RefreshIcon /> Reset
              </ActionButton>
            </Controls>
          </TimerCard>
        </DualLayout>
      </TimerContainer>
    </ThemeProvider>
  );
}

export default Timer;
