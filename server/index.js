// import our function encryption and decryption

const { encrypt, decrypt } = require("./EncryptionHandler");
const express = require("express");
const app = express();

// away to interact with mysql
const mysql = require("mysql");
// away for cleint's url to talk server's urls
const cors = require("cors");
// make sure the server running a different port then the default react port
// by set and port vari
const PORT = 3001;

app.use(cors());
app.use(express.json());

// make an connection to the database
const db = mysql.createConnection({
    // the own name of the database
    user: "root",
    // host on ame machine
    host: "localhost",
    // password is hidden to the database
    password: process.env["pw"],
    // name of database
    database: "PasswordManager",
});

// test in the  browser http://localhoManst:3001/
// app.get('/', (req, res) => {
//     res.send("Hello World!")
// })

// destructuring body from the for the post request
app.post("/addpassword", (req, res) => {
    const { password, title } = req.body;
    // encrypt the password
    const passwordEncrpted = encrypt(password);

    //  run a database query add a password title to the database table
    db.query(
        "INSERT INTO  Passwords (password, title, iv) VALUES (?,?,?)",
        [passwordEncrpted.password, title, passwordEncrpted.iv],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Success!!!");
            }
        }
    );
});

app.delete("/deletepassword/:id", (req, res) => {
    const delid = req.params.id;
    db.query("DELETE FROM Passwords WHERE id=?", delid, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/showpasswords", (req, res) => {
    db.query("SELECT * FROM Passwords", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
});


app.put("/updatepassword", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const passwordEncrpted = encrypt(password);
    db.query("UPDATE Passwords SET password = ?, iv = ? WHERE id = ?",[passwordEncrpted.password,passwordEncrpted.iv , id],(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// an output to the terminal know the server is running
app.listen(PORT, () => {
    console.log("Test browser at http://localhost:3001/");
    console.log("The server is run on port " + PORT);
});
