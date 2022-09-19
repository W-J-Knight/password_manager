const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors');

const PORT = 3001

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: process.env['pw'],
    database: 'PasswordManager',
})

// test in the  browser http://localhoManst:3001/
// app.get('/', (req, res) => {
//     res.send("Hello World!")
// })

app.post('/addpassword', (req, res) => {
    const { password, title } = req.body

    db.query("INSERT INTO  Passwords (password, title) VALUES (?,?)", [password, title], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Success!!!")
        }
    });
})

app.listen(PORT, () => {
    console.log('Test browser at http://localhost:3001/');
    console.log('The server is run on port ' + PORT)
})
// https://youtu.be/ZNY_PYGxrdc?t=512