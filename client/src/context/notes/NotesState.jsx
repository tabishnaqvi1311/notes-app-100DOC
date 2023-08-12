import React, { useState } from "react";
import { noteContext } from "./noteContext";

export const NoteState = (props) => {
    // const [state, setState] = useState(state);
    const notesIni = []

    const [notes, setNotes] = useState(notesIni);



    const fetchNotes = async() => {
        const response = await fetch(`http://localhost:8181/api/notes/getAllNotes`, {
            method: "GET",
            headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiJ9.MzE.g4-yH8F0IP2hjQe-FEVbsGxDFteGfM-mBXDD3-1iFwM'
            },
        });

        const json = await response.json();
        setNotes(json);
    }



    const addNote = async(title, desc, tag) => {

        const response = await fetch(`http://localhost:8181/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiJ9.MzE.g4-yH8F0IP2hjQe-FEVbsGxDFteGfM-mBXDD3-1iFwM'
            },
            body: JSON.stringify({title, desc, tag})
        })

        const json = await response.json();
        console.log(json);

        let note = {
            "title": title,
            "desc": desc,
            "tag": tag
        }
        setNotes(notes.concat(note));
    };



    const editNote = async (id, title, desc, tag) => {

        const response = await fetch(`http://localhost:8181/api/notes/updateNote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiJ9.MzE.g4-yH8F0IP2hjQe-FEVbsGxDFteGfM-mBXDD3-1iFwM'
            },
            body: JSON.stringify({title, desc, tag})
        })

        const json = await response.json();

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                notes[i].title === title;
                notes[i].desc === desc;
                notes[i].tag === tag;
            }
        }
    };




    const deleteNote = async(id) => {

        console.log(id);
        const response = await fetch(`http://localhost:8181/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiJ9.MzE.g4-yH8F0IP2hjQe-FEVbsGxDFteGfM-mBXDD3-1iFwM'
            },
        })
        const json = await response.json();
        console.log(json);

        let newNote = notes.filter((note) => { return note.id !== id })
        setNotes(newNote);
    };



    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}