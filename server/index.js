const express = require('express');
const app = express()
const db = require("./db");
const port = 8181;

const authRoute = require("./routes/auth.js");
const noteRoute = require("./routes/notes.js");

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);

app.listen(port, () => {
    console.log(`server alive on http://localhost:${port}`);
})