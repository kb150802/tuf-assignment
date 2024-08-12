const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: 'bannerconfig',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/banner', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM banner_info LIMIT 1');
    res.json(rows[0] || { is_visible: false, description: '', timer: 0, link: '' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching banner data' });
  }
});

app.post('/api/banner', async (req, res) => {
  const { is_visible, description, timer, link } = req.body;
  try {
    await pool.query(
      'UPDATE banner_info SET is_visible = ?, description = ?, timer = ?, link = ? WHERE id = 1',
      [is_visible, description, timer, link]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating banner data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));