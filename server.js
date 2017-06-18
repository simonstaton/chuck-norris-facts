import express from 'express';
import path from 'path';
import compression from 'compression';
import dotenv from 'dotenv';
import router from './router';

dotenv.config(); // Load env variables

// Set app constants
const app = express();
const port = process.env.PORT;

// Set middleware
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));
app.use(compression());
app.use(function (req, res, next) {
  if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
  next();
});

// Setup embeddedjs template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setup router/api endpoints
router(app);

// Load app
app.listen(port);

