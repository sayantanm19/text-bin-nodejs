const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs  = require('express-handlebars');


var config = require('./config');

const app = express();

var Paste = require('./models/paste');
var paste_controller = require('./controllers/pasteController');

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


app.use(express.static(path.join(__dirname, 'public')))
app.use('/pastes', express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Handlebars View-Engine Middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/editor', (req, res) => {
  //res.send('You should try visiting /new for new paste');
  res.render('editor');
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

// GET request for creating a Paste. NOTE This must come before route that displays PAste.
app.get('/new', paste_controller.paste_create_get);

// POST request for creating Paste.
app.post('/new', paste_controller.paste_create_post);

// Get paste in editor mode by default
app.get('/pastes/:id', (req, res) => {
  num = req.params.id;
  text = req.query.text

  // By default editor is true
  //editor = true;

  Paste.findOne({"idx": num}, function(err, result) {
    if (err) throw err;
    //console.log(result[0].paste)
    res.render('view_paste_editor', {paste: result});
    //res.send(result);
	})
});

// Get paste in text mode
/* app.get('/pastes/:id/', (req, res) => {
  num = req.params.id;
  text = req.query.text
  Paste.findOne({"idx": num}, function(err, result) {
    if (err) throw err;
    //console.log(result[0].paste)
    res.render('view_paste', {paste: result, editor: false});
    //res.send(result);
	})
}); */
  
  
//mongoose.connection.close();

app.listen(config.port, () => {
  console.log('App listening on port:  ' + config.port);
});
