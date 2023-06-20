const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const cors = require('cors');

const fileRoutes = require('./routes/file.route');
const userRoutes = require('./routes/user.route');
const sqlClient = require('./database/connect');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const filename = encodeURIComponent(`${timestamp}-${file.originalname}`);
    cb(null, filename);
  }
});
const upload = multer({ storage });

const port = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json());
app.use(upload.single('file'));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/file', fileRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
  try {
    res.send("Test task in express");
  } catch(e) {
    res.sendStatus(500);
  }
});

sqlClient.connectToDB((err) => {
  if (err) {
    console.error(err);
    process.exit()
  }
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
})
