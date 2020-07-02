const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressws = require('express-ws');
const router = require('./router');

const app = express();
const port = process.env.PORT || 5000;
const ws = expressws(app);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

router.configureRest(app);
router.configureSocket(app);

process.env.IS_DEV = process.env.NODE_ENV !== 'production';

if (process.env.IS_DEV) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
