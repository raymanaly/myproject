const express = require('express');
const { sql } = require('@vercel/postgres');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Double-check column names (name, email, message) in your Neon table!
        await sql`INSERT INTO contact_submissions (name, email, message) 
                  VALUES (${name}, ${email}, ${message});`;
        res.status(200).send("Success");
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live on ${PORT}`));