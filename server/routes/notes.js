const express = require("express");
const isUserAuthenticated = require("../middleware/isUserAuthenticated");
const router = express.Router();
const db = require("../db");
const { body, validationResult } = require("express-validator");


router.get("/getAllNotes", isUserAuthenticated, async (req, res) => {
    db.query("SELECT * FROM notes", (err, data) => {
        if (err) return res.json(err.message);
        return res.json(data);
    });
})

router.post("/addNote", isUserAuthenticated, [
    body(`title`, `Enter a Valid Title`).isLength({ min: 3 }),
    body(`desc`, `Enter a valid description (at least 5 chars)`).isLength({ min: 5 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

    const { title, desc, tag } = req.body;
    const values = [title, desc, tag];

    const note = "INSERT INTO notes(`title`, `desc`, `tag`) VALUES(?)";
    db.query(note, [values], async(err, data) => {
        if (err) return res.status(500).json(err.message);
        return res.status(201).json("New note created");
    })
})

router.put("/updateNote/:id", isUserAuthenticated,  (req, res) => {
    const {title, desc, tag} = req.body;
    const {id} = req.params
    // const newNote = ["hello", "updated this note", "funny", 1];
    const newNote = [];
    if(title) newNote.push(title);
    if(desc) newNote.push(desc);
    if(tag) newNote.push(tag);
    if(id) newNote.push(parseInt(id));


    db.query("SELECT * FROM notes WHERE `idnotes` = ?", id, (err, data) => {
        if(err) return res.status(500).json({err: err.message});
        if(data.length === 0) return res.status(404).json({err: "not found"});

        const q = "UPDATE notes SET `title` = ?, `desc` = ?, `tag` = ? WHERE `idnotes` = ?"

        // newNote.map((item) => console.log(typeof(item)));

        db.query(q, newNote, (err) => {
            if(err) return res.status(500).json(err.message);
            return res.json(`Note updated`);
        })
    });

})

router.delete("/deleteNote/:id", isUserAuthenticated, (req, res) => {
    const {id} = req.params;

    db.query("SELECT * FROM notes WHERE `idnotes` = ?", id, (err, data) => {
        if(err) return res.status(500).json(err.message);
        if(data.length === 0) return res.status(404).json({err: "not found"});

        const q = "DELETE FROM notes WHERE `idnotes` = ?";

        db.query(q, id, (err) => {
            if(err) return res.status(500).json(err.message);
            return res.json(`Deleted Note with Id = ${id}`);
        })
    })
})

module.exports = router;