import React, { useContext, useState } from 'react'
import { noteContext } from '../context/notes/noteContext'

const AddANote = () => {

    const {addNote} = useContext(noteContext)

    const [note, setNote] = useState({title: "", desc: "", tag: "okokok"});

    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.desc, note.tag);
        setNote("", "", "");
    }


    return (
        <div className='container my-3'>
            <h1>Add A Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" onChange={onchange} name='desc'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Description</label>
                    <input type="text" className="form-control" id="tag" onChange={onchange} name='tag'/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
            <h3>Your Notes</h3>
        </div>
    )
}

export default AddANote
