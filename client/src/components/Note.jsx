import React, { useContext } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { noteContext } from '../context/notes/noteContext';

const Note = (props) => {
    const {deleteNote} = useContext(noteContext);
    const { note } = props

    const handleDelete = (e) => {
        e.preventDefault();
        deleteNote(note.idnotes);
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.desc}</p>
                    <span>{note.idnotes}</span>
                    <div>
                        <DeleteOutlineIcon onClick={handleDelete}/>
                        <EditNoteIcon className='mx-3'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note
