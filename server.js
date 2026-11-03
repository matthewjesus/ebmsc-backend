// የዳታቤዝ ግንኙነት (Environment Variables ተጠቅመን)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // <--- ፓስወርዱ ከዚህ ተወግዷል
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false 
    }
});