// app/routes.js
var mongoose = require('mongoose');
var request = require('request');

//var Note = require('./models/note');
var Movie = require('./models/movie');
//var Food = require('./models/food');


//var Movie = mongoose.model('Movie', MovieSchema);

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/notes', function(req, res) {
        // use mongoose to get all notes in the database
        Note.find(function(err, nerds) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(notes); // return all notes in JSON format
        });
    });

    app.get('/search', function (req, res) {
        var title = req._parsedUrl.query.split('=')[1];
        var key = 'yqrp8njh8rmqjxr8qrkc59td';
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey='+key+'&q=' + title;


        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //send array of search results
                res.send(body);

                //get the first movie from search results
                var movie = {rtObj: JSON.parse(body).movies[0]};

                //create and save the first movie into database
                Movie.create(movie, function (err, data, next){
                    if (err) return next(err);
                })



            };
        })
    });


    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};