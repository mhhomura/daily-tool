// src/styles/AppStyles.js
import styled from 'styled-components';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
 
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.nav};
  height: 60px;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0px 15px;
`;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
 /*  background: ${({ theme }) => theme.primary}; */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


export const LightIcon = styled(LightModeIcon)`
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
  `;
export const DarkIcon = styled(DarkModeIcon)`
    color: ${({ theme }) => theme.primary};
    cursor: pointer;

  `;