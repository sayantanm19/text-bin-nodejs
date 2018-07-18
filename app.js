const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs  = require('express-handlebars');

var config = require('./config');

var moment = require('moment');

//Set up Moment
moment().format();

const app = express();

var Paste = require('./models/paste');
var paste_controller = require('./controllers/pasteController');

let latest_pastes;

//Set up default mongoose connection
mongoose.connect(config.mongoURL);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected Succesfully')
});


app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/pastes', express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Handlebars View-Engine Middleware 
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, "views/layouts/"),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    secondsAgo: function(date) {
      return moment(date).fromNow();
    },
    formattedDate: function(date) {
      //date = toString(date);
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
})
);


app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.redirect('/new');
});

app.get('/all', (req, res) => {
  Paste.find({}, function(err, result) {
    if (err) throw err;
    res.send(result);
	})
});

// GET request for creating a Paste. NOTE This must come before route that displays PAste.
app.get('/new', paste_controller.paste_create_get);

// POST request for creating Paste.
app.post('/new', paste_controller.paste_create_post);

// Scrape latest pastes

function getLatest() {
  Paste.find({}).sort('-createdAt').limit(10).exec(function(err, result) {
    if (err) throw err;
    latest_pastes = result;
    console.log('Scraped succesfully')
    //res.send(result);
	})
};

// Run getLatest() to update latest posts every 10 seconds
setInterval(getLatest, 20000);

app.get('/latest', (req, res) => {
  // Put getLatest in setInterval() function
  // getLatest();
  //

  res.render('latest', {latest: latest_pastes});
  
});

// Get paste in editor mode by default
app.get('/pastes/:id', (req, res) => {
  num = req.params.id;
  text = req.query.text

  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  // By default editor is true
  //editor = true;

  Paste.findOne({'idx': num}, function(err, result) {
    if (err) throw err;
    if (!result)
    {
      console.log('No records or expired');
      res.render('not_found');
    }
    else {
    //console.log(result[0].paste)
    res.render('view_paste_editor', {paste: result, url: fullUrl});
    }
    //res.send(result);
	})
});
  
//mongoose.connection.close();

app.listen(config.port, () => {
  console.log('App listening on port:  ' + config.port);
});
