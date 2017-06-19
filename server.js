import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router(app);
app.listen(port);
