var Paste = require('../models/paste');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var datenow = new Date().toString();

// GET request
exports.paste_create_get = function(req, res, next) {
    res.render('input_form_editor', {
        language: 'javascript'
    });
    //NOTE: sendFile is independent of middleware static
    //res.sendFile('index.html', { root: path.join(__dirname, '../public') })

};



// Handle Paste create on POST.
exports.paste_create_post = [

    //console.log(req.body.paste);
    //console.log(req.body.idx);

    // Validate that the paste field is not empty.
    body('paste', 'Enter something to post').isLength({ min: 1 }).trim(),
    body('idx', 'ID should not be empty.').isLength({ min: 1 }).trim(),
    
    //body('title', )

    // Sanitize (trim and escape) the paste and id field.
    sanitizeBody('paste').trim(),
    sanitizeBody('idx').trim(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var pastesubmit = new Paste(
          { 
            idx: req.body.idx,
            paste: req.body.paste,
            date: datenow,
            title: req.body.title
          }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log(errors.array())
            res.render('input_form_editor', { errors: errors.array()});
            //res.sendFile('index.html', { root: path.join(__dirname, '../public') })
            console.log('Errors while submitting, plx to recheck!!!')
        return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Paste.findOne({ 'idx': req.body.idx })
                .exec( function(err, found_paste) {
                     if (err) { return next(err); }

                     if (found_paste) {
                         // Genre exists, redirect to its detail page.
                         //res.redirect(found_genre.url);
                         console.log('Previous paste found with same url')
                     }
                     else {

                         pastesubmit.save(function (err) {
                           if (err) { return next(err); }
                           // Genre saved. Redirect to genre detail page.
                           console.log('Succesful post')
                           res.redirect('/pastes/' + req.body.idx);
                         });

                     }

                 });
        }
    }
];

