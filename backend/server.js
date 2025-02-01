const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['https://nagacharan-registration-form.netlify.app', 'http://localhost:3000']
  }));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Naga@1975",
    database: "Registration",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database.");
    }
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Name, email, and password are required." });
            }

            // Log the data received from the client
            console.log("Data received from client:", { name, email, password });

            // To check if username or email already exists
             db.query("SELECT * FROM signup WHERE Name = ? OR Email = ?", [name, email], (err, results) => {
                if(err) {
                    console.error("Database error during SELECT query:", err)

                    return res.status(500).json({message: "Error during registration. Please try again."});
                }

                // if user with the same name or email exists then return this error
                if(results.length > 0){
                    const existingUser = results[0];
                    if(existingUser.Name === name){
                        return res.status(409).json({message: "Username already registered"})
                    }
                    if(existingUser.Email === email){
                        return res.status(409).json({message: "Email already registered"})
                    }
                }
            })

            // If no duplicate user exists, insert the new data into the database
            db.query(
                "INSERT INTO signup (Name, Email, Password) VALUES (?, ?, ?)",
                [name, email, password],
                (err, data) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ message: "Error during registration. Please try again." });
                    } else {
                        // Log the query result (metadata)
                        console.log("Query result (metadata):");

                        // Log the data that was inserted into the database
                        console.log("Data inserted into database:", { name, email, password });

                        res.status(200).json({ message: "Registration Successful" });
                    }
                }
            );
        });


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    
    console.log("Data received from client:", { email, password });

    db.query(
        "SELECT Email, Password FROM signup WHERE Email = ? AND Password = ?",
        [ email, password],
        (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Error during login. Please try again." });
            } else {
                
                console.log("Query result:", JSON.stringify(data, null, 2));

                if (data.length > 0) {
                    res.status(200).json({ message: "Login successful!" });
                } else {
                    res.status(401).json({ message: "Invalid email or password." });
                }
            }
        }
    );
});



app.listen(3003, () => {
    console.log("Listening on port 3003");
});
