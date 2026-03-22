import styled, { keyframes } from 'styled-components';

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;

export const DualLayout = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 900px;
  margin-top: 1rem;
`;

export const TimerCard = styled.div`
  background: ${({ theme }) => theme.cardBackground || 'rgba(255, 255, 255, 0.05)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.borderColor || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const ModeSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.buttonBackground || 'rgba(0, 0, 0, 0.1)'};
  padding: 5px;
  border-radius: 30px;
`;

export const ModeButton = styled.button`
  background: ${({ active, theme }) => active ? theme.activeButton || '#4caf50' : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.text};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => active ? theme.activeButton : 'rgba(255,255,255,0.1)'};
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
`;

export const CircularProgress = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme, color }) => color || '#4caf50'} ${({ progress }) => progress}%, 
    ${({ theme }) => theme.progressTrack || 'rgba(200, 200, 200, 0.2)'} 0%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  animation: ${({ isRunning }) => isRunning ? pulse : 'none'} 2s infinite;

  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${({ theme }) => theme.cardBackground || '#fff'};
    z-index: 1;
  }
`;

export const TimeDisplay = styled.div`
  position: absolute;
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  font-family: 'Roboto Mono', monospace;
  z-index: 2;
`;

export const Controls = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  background: ${({ color }) => color || '#2196f3'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CycleCounter = styled.div`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

export const SettingsButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const SettingsPanel = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor || 'rgba(0,0,0,0.1)'};
  display: ${({ show }) => show ? 'flex' : 'none'};
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StyledLabel = styled.label`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
`;

export const StyledInput = styled.input`
  width: 55px;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor || 'rgba(0,0,0,0.15)'};
  background: ${({ theme }) => theme.inputBackground || 'rgba(255,255,255,0.05)'};
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: 2px solid ${({ color }) => color || '#4caf50'};
    border-color: transparent;
  }
`;

export const PresetGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 0.8rem;
`;

export const PresetButton = styled.button`
  background: ${({ active, theme }) => active ? (theme.activeButton || '#4caf50') : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ active, theme }) => active ? '#fff' : theme.text};
  border: 1px solid ${({ active, theme }) => active ? 'transparent' : theme.borderColor || 'rgba(0,0,0,0.1)'};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ active, theme }) => active ? theme.activeButton : 'rgba(0,0,0,0.08)'};
  }
`;
