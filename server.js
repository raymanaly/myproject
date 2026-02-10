const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({ extended: true }));

// This connects to your MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1416', // Type your MySQL password here
    database: 'portfolio_db'
});

// This part saves the message
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO messages (user_name, user_email, message_text) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.send("Error!");
        res.send("Success! Your message is in the database.");
    });
});

app.listen(3000, () => console.log('Server is running!'));