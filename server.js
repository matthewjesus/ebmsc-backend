const express = require('express');
const mysql = require('mysql2'); // <--- ይህ መስመር በግድ መኖር አለበት!
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// የዳታቤዝ ግንኙነት (Environment Variables ተጠቅመን)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false 
    }
});

db.connect(err => {
    if (err) console.error('❌ የዳታቤዝ ስህተት:', err);
    else console.log('✅ ከ Aiven ክላውድ ዳታቤዝ ጋር ተገናኝቷል!');
});

// የሱቆችን ዝርዝር ለማምጣት
app.get('/api/shops', (req, res) => {
    db.query('SELECT * FROM shops', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// የመገናኛ ቅጽ መረጃን ለመቀበል
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const sql = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'መልእክትዎ በተሳካ ሁኔታ ተቀብሏል!' });
    });
});

app.listen(3000, () => console.log('🚀 ሰርቨር በፖርት 3000 ላይ እየሰራ ነው'));