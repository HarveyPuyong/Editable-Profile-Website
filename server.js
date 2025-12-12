require('dotenv').config();

const Express = require('express');
const app = Express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {logger} =  require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/cors-option');
const dbConn = require('./config/dbConn');
const PORT = process.env.PORT || 4500;

// If running in production behind a proxy (Render, Heroku, Railway), enable trust proxy
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  console.log('Trust proxy enabled (production)');
}

dbConn.connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(Express.json());

app.use(cookieParser());

app.use(Express.static(path.join(__dirname, 'frontend')));

app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  return res.redirect('main-page.html');
});

app.use('/content', require('./routes/content-route'));
app.use('/auth', require('./routes/auth-route'));


app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
  app.listen(PORT, () => console.log(`Server is listen to port: http://localhost:${PORT}`));
});
