const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config()

const thoughtsRouter = require('./routes/thoughts')

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

// app.use('/api/thoughts', thoughtsRouter);

// app.use(express.static('dist'))

// rutas API
app.use('/api/thoughts', thoughtsRouter);

app.use(express.static('dist'));

// fallback
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})