import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Planner from './pages/Planner';
import Timer from './pages/Timer';
import Notes from './pages/Notes';
import { TimerProvider, TimerContext } from './context/TimerContext';
import { Wrapper, Nav, Button, Container } from './app';
import GlobalStyle from './globalStyle';

import {
  DarkIcon,
  LightIcon,
} from './app';

function FloatingTimer() {
  const { isRunning, timeLeft, mode } = useContext(TimerContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isRunning || location.pathname === '/timer') return null;

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
       position: 'fixed', bottom: '20px', right: '20px', 
       background: mode === 'work' ? '#f44336' : '#4caf50', 
       color: 'white', padding: '12px 20px', borderRadius: '25px',
       cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
       fontWeight: 'bold', zIndex: 9999,
       display: 'flex', alignItems: 'center', gap: '8px',
       fontFamily: 'Roboto Mono, monospace',
       fontSize: '0.9rem',
       transition: 'background 0.3s ease'
    }} onClick={() => navigate('/timer')}>
       ⏱️ {formatTime(timeLeft)}
    </div>
  );
}

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
    setThemeMode(theme);
  }

  React.useEffect(() => {
    setThemeMode(localStorage.getItem('theme'));
  }, [])

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <TimerProvider>
        <Wrapper>
        <Nav>
          <Container>
            <h4>Daily Tool</h4>
          </Container>
          <Container>
            <Link to="/">Planner</Link>
            <Link to="/timer">Timer</Link>
            <Link to="/notes">Notes</Link>
            {/*  <Link to="/calculator">Calculadora</Link> */}
            {themeMode === "dark" ?
                <LightIcon onClick={() => setTheme('light')}/>
              :
                <DarkIcon onClick={() => setTheme('dark')}/>
            }
          </Container>
        </Nav>

        <Routes>
          <Route path="/" element={<Planner />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
        <FloatingTimer />
      </Wrapper>
    </TimerProvider>
    </ThemeProvider>
  );
}

export default App;