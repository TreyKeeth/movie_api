const express = require('express');
morgan = require('morgan'),
fs = require('fs'), // import built in node modules fs and path
path = require("path");

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let favoriteMovies = [
  {
    title: 'Anchorman'
  },
  {
    title: 'Django Unchained'
  }, 
  {
    title: 'Inglorious Bastards'
  }, 
  {
    title: 'Wolf of Wall Street'
  }, 
  {
    title: 'American Gangster'
  }
];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('myFlix');
});

app.get('/movies', (req, res) => {
  res.json(favoriteMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('An error happened');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

