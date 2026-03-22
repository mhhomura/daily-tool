import styled from 'styled-components';

export const NotesContainer = styled.div`
  display: flex;
  height: calc(100vh - 80px); /* Adjust based on navbar height */
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 280px;
  background: ${({ theme }) => theme.cardBackground || 'rgba(255, 255, 255, 0.05)'};
  backdrop-filter: blur(10px);
  border-right: 1px solid ${({ theme }) => theme.borderColor || 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 80px; /* Collapse on mobile - or toggle */
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

export const NewNoteButton = styled.button`
  background: ${({ theme }) => theme.activeButton || '#2196f3'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const NoteItem = styled.div`
  padding: 0.8rem;
  border-radius: 8px;
  background: ${({ active }) => active ? 'rgba(33, 150, 243, 0.15)' : 'transparent'};
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid ${({ active }) => active ? 'rgba(33, 150, 243, 0.3)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  h4 {
    margin: 0 0 0.3rem 0;
    font-size: 0.95rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary || '#888'};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const MainEditor = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const NoteTitleInput = styled.input`
  background: transparent;
  border: none;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  width: 100%;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

export const NoteBodyTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  resize: none;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #f44336;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
