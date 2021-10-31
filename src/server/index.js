const cors = require('cors');
const express = require('express');

const path = require('path');
const dotenv = require('dotenv');
// const multer = require('multer');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const key = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // res.sendFile('dist/index.html');
  res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('/analyze', async (req, res) => {
  const { articleUrl } = req.body;
  const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${key}&url=${articleUrl}&lang=en`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  res.send(data);
});

// designates what port the app will listen to for incoming requests
app.listen(8088, () => {
  console.log('Express is listening on port 8088!');
});
