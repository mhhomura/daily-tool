import React, { useState, useEffect, useRef } from 'react';
import localforage from '../storage';
import {
  NotesContainer, Sidebar, SidebarHeader, NewNoteButton, NoteItem,
  MainEditor, EditorHeader, NoteTitleInput, NoteBodyTextarea, DeleteButton, NotesList
} from './NotesStyles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';

function Notes() {
  const [themeMode, setThemeMode] = useState('light');
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (activeNoteId && titleInputRef.current) {
      setTimeout(() => titleInputRef.current.focus(), 50);
    }
  }, [activeNoteId]);

  useEffect(() => {
    setThemeMode(localStorage.getItem('theme') || 'light');
    
    // Load notes from localforage
    localforage.getItem('notes').then((savedNotes) => {
      if (savedNotes && savedNotes.length > 0) {
        setNotes(savedNotes);
        setActiveNoteId(savedNotes[0].id);
      }
    });
  }, []);

  useEffect(() => {
    // Save notes whenever they change
    if (notes.length >= 0) {
      localforage.setItem('notes', notes);
    }
  }, [notes]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Title',
      body: 'Start typing here...',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (field, value) => {
    setNotes(notes.map(note => {
      if (note.id === activeNoteId) {
        return { ...note, [field]: value, updatedAt: Date.now() };
      }
      return note;
    }));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    if (activeNoteId === id) {
      setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }
  };

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <NotesContainer>
        <Sidebar theme={currentTheme}>
          <SidebarHeader>
            <h3>Notes</h3>
            <NewNoteButton onClick={createNote} theme={currentTheme}>
              <AddIcon style={{ fontSize: '1rem' }} />
            </NewNoteButton>
          </SidebarHeader>
          <NotesList>
            {notes.map(note => (
              <NoteItem 
                key={note.id} 
                active={note.id === activeNoteId}
                onClick={() => setActiveNoteId(note.id)}
                theme={currentTheme}
              >
                <h4>{note.title || 'Untitled'}</h4>
                <p>{note.body ? (note.body.length > 30 ? note.body.substring(0, 30) + '...' : note.body) : 'Empty'}</p>
              </NoteItem>
            ))}
          </NotesList>
        </Sidebar>

        <MainEditor theme={currentTheme}>
          {activeNote ? (
            <>
              <EditorHeader>
                <NoteTitleInput 
                  ref={titleInputRef}
                  value={activeNote.title} 
                  onChange={(e) => updateNote('title', e.target.value)}
                  placeholder="Title"
                  theme={currentTheme}
                />
                <DeleteButton onClick={() => deleteNote(activeNote.id)}>
                  <DeleteForeverIcon style={{ fontSize: '1.2rem' }} /> Delete
                </DeleteButton>
              </EditorHeader>
              <NoteBodyTextarea 
                value={activeNote.body} 
                onChange={(e) => updateNote('body', e.target.value)}
                placeholder="Start writing..."
                theme={currentTheme}
              />
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', opacity: 0.4 }}>
               Select or create a note in the sidebar 📝
            </div>
          )}
        </MainEditor>
      </NotesContainer>
    </ThemeProvider>
  );
}

export default Notes;
