import React, { useContext, useEffect } from 'react'
import { noteContext } from '../context/notes/noteContext'
import Note from './Note';
import AddANote from './AddANote';

const Notes = () => {

    const { notes, fetchNotes } = useContext(noteContext);

    useEffect(() => {
        fetchNotes();
    }, [])

    const updateNote = (note) => {

    }

    return (
        <>
            <AddANote />


            <div className='row my-3'>
                {notes.map((note) => {
                    return <Note note={note} key={note.id}  />
                })}
            </div>
        </>
    )
}

export default Notes
