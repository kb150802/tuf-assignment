const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: 'bannerconfig',
  port: 54817,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database as id', connection.threadId);
});

app.get('/api/banner', async (req, res) => {
  try {
    connection.query('SELECT * FROM banner_info LIMIT 1;',(err, result)=>{
      if(err) {
        console.log("Error connecting to the database", err);
      }
      console.log(result);
      res.json(result[0] || { is_visible: false, description: '', timer: 0, link: '' });
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching banner data' + error });
  }
});

app.post('/api/banner', async (req, res) => {
  const { is_visible, description, timer, link } = req.body;
  try {
    connection.query(
      'UPDATE banner_info SET is_visible = ?, description = ?, timer = ?, link = ? WHERE id = 1',
      [is_visible, description, timer, link], (err, result)=> {
        if(err) {
          res.status(500).json({error: 'An error occurred while updating banner data'});
        }
        res.status(200).json({message: 'Banner Data updated successfuly'});
      });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating banner data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));