const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isUserAuthenticated = require("../middleware/isUserAuthenticated");


//Signup route
router.post("/onboard", [
    body(`username`, `Username too short`).isLength({ min: 3 }),
    body(`email`, `Enter a valid email`).isEmail(),
    body(`password`, `Password Too Weak`).isStrongPassword()
], async (req, res) => {
    //check req.body for invalid values using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    //check if email exist
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [email], (err, data) => {

        if (err) return res.json({ err: err.message });
        if (data.length) return res.status(400).json("email already exists");
        //user exists, so create one

        //hash and salt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"

        db.query(q, [[username, email, hash]], async (err, data) => {
            if (err) {
                console.log({ err: err.message });
                return res.json(err);
            }

            const q = "SELECT `idusers` FROM users WHERE email = ?"
            const getId = await new Promise((resolve, reject) => {
                db.query(q, [email], (err, data) => {
                    if (err) reject(err);
                    else resolve(data[0].idusers);
                });
            })

            const token = jwt.sign(getId, "jwtSECRET");

            return res.status(201).json({ token });
        })
    })
});


router.post("/login", [
    body(`email`, `Enter a Valid Email`).isEmail(),
    body(`password`, `password cannot be blank`).exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {email, password} = req.body;

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err, data) => {
        if(err) return res.json(err);
        if(data.length === 0) return res.status(401).json("user already exists");

        const compareWith = bcrypt.compareSync(password, data[0].password);
        if(!compareWith) return res.status(400).json("Enter correct credentials");

        const id = data[0].idusers
        const token = jwt.sign(id, "jwtSECRET");
        if(!token) return res.status(401).json("Unauthorized");

        return res.status(200).json(token);
    })
})

router.get("/getUserDet", isUserAuthenticated, async(req, res) => {
    const {id} = req.body;

    const q = "SELECT `username`, `email` FROM users WHERE idusers = ?";
    db.query(q, [id], (err, data) => {
        if(err) return res.status(500).json({'Internal Server Err': err.message});
        if(data.length === 0) return res.status(400).json("User does not exist");
        return res.json(data);
    })

})

module.exports = router;