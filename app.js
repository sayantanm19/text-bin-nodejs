const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config');
var path = require("path");

const app = express();
var Paste = require('./models/paste');

var paste_controller = require('./controllers/pasteController');


//Set up default mongoose connection

mongoose.connect(config.mongoURL);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected Succesfully')
});

app.use('/', express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('HMMMMMM??????');
});

app.get('/all', (req, res) => {
  Paste.find({}, function(err, result) {
    if (err) throw err;
    res.send(result);
	})
  });

//Enter Paste Page
/*
app.get('/new', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname })
});
*/

// GET request for creating a Paste. NOTE This must come before route that displays Genre (uses id).
app.get('/new', paste_controller.paste_create_get);

// POST request for creating Paste.
app.post('/new', paste_controller.paste_create_post);

//Get a list of all Jokes in Database
app.get('/pastes/:id', (req, res) => {
  num = req.params.id;
  Paste.find({"idx": num}, function(err, result) {
    if (err) throw err;
    res.send(result);
	})
  });
  
  
//mongoose.connection.close();

app.listen(config.port, () => {
  console.log('App listening on port:  ' + config.port);
});
