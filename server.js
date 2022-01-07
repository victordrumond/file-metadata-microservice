// Require dependencies & basic configuration
const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

// POST request: upload file
app.post('/api/file/analyse', upload.single('upfile'), (req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  });
});

// Listen connection on port
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});