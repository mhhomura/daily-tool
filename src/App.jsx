import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { Routes, Route, Link } from 'react-router-dom';
import Planner from './pages/Planner';
import { Wrapper, Nav, Button, Container } from './app';
import GlobalStyle from './globalStyle';

import{
  DarkIcon,
  LightIcon,
} from './app'

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
      <Wrapper>
        <Nav>
          <Container>
            <h4>Daily Tool</h4>
          </Container>
          <Container>
            <Link to="/">Planner</Link>
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
        </Routes>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;