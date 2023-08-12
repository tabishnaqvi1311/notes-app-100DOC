import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NoteState } from './context/notes/NotesState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NoteState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NoteState>,
)
