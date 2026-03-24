const express = require('express');
const { sql } = require('@vercel/postgres');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
    
    try {

        await sql`INSERT INTO contact_submissions (name, email, message) 
                  VALUES (${name}, ${email}, ${message});`;
        
        res.send("Success! Your message is in the Neon database.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving to database!");
    }
});
