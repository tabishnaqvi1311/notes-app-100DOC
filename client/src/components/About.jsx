import React, { useContext } from 'react'
import { noteContext } from '../context/notes/noteContext'

const About = () => {

    const A = useContext(noteContext)

    return (
        <div>
            {A.name}
        </div>
    )
}

export default About
