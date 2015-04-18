// app/routes.js
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var request = require('request');
//var deepPopulate = require('mongoose-deep-populate');


var Movie = require('./models/movie');
var MovieList = require('./models/movieList');
var User = require('./models/user');

//var Note = require('./models/note');
//var Food = require('./models/food');


module.exports = function(app) {

    // movie routes ===========================================================

    app.get('/getmovies', function(req, res) {
        if (req.session.userId){

            User
                .findById(req.session.userId)
                .deepPopulate('moviesLists.movies')
                .exec( function (err, user){
                    res.send(user.moviesLists);
                })

        } else {
            res.send(401);
        }
    });

    app.delete('/deleteMovie/:list/:id', function (req, res){
        MovieList
            .findById(req.params.list, function (err, list){
                list.movies.remove(req.params.id);
                list.save(function (err, newList){
                    console.log(newList);
                    res.send(newList);
                })
            })

    });

    app.get('/search', function (req, res, next) {
        var list = req._parsedUrl.query.split('&')[0].split('=')[1];
        var title = req._parsedUrl.query.split('&')[1].split('=')[1];
        var key = 'yqrp8njh8rmqjxr8qrkc59td';
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=' + key + '&q=' + title;

        request(url, function (error, response, foundMovies) {
            if (!error && response.statusCode == 200) {

                //get the first movie from search results
                var movie = JSON.parse(foundMovies).movies[0];

                //create and save movie into database
                Movie.create({rtObj: movie}, function (err, newMovie){
                    if (err) return next(err);

                    MovieList
                        .findByIdAndUpdate(
                            list,
                            {$push: {'movies': newMovie }})
                        .populate('movies')
                        .exec(function(err, updatedlist){
                            if (err) return next(err);
                            res.send(updatedlist);
                        })
                })
            }
        });
    });

    // movie list routes ===========================================================

    app.get('/get-all-lists', function(req, res) {
        if (req.session.userId){
            User.findById(req.session.userId)
                .populate('moviesLists')
                .exec( function(err, user, next){
                if (err) next(err);
                else {
                    res.send(user.moviesLists);
                }
            });
        } else {
            res.send(401);
        }
    });


    app.post('/new-movie-list', function (req, res, next) {

        MovieList.create({'listName': req.body.name}, function (err, list){
            if (err) return next(err);

            User.findByIdAndUpdate(
                req.session.userId,
                {$push: {'moviesLists': list }},
                function (err, user) {
                    if (err) return next(err);
                    res.send(list);
                })
            })
    });

    app.delete('/delete-list/:id', function (req, res, next) {
        console.log('req.params: ', req.params.id);
        MovieList
            .findByIdAndRemove(
                req.params.id,
                function(err, list, next){
                    if (err) next(err);
                    else {
                        console.log(list + ' deleted.');
                        res.send(204);
                    }
            })
    });

    // user login routes =========================================================

    app.post('/signup', function (req, res, next) {

        User.create(req.body, function (err, user){
            if (err) next(err);
            else {
                req.session.userId = user._id;
                res.send(201);
            }
        })
    });

    app.post('/login', function (req, res, next) {
        var attempt = req.body.password;
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) next(err);
            else if (!user || !user.authenticate(attempt)) res.send(401);
            else {
                req.session.userId = user._id;
                res.send(200);
            }
        })
    });

    app.get('/logout', function (req, res, next) {
        req.session.destroy(function (err){
            if (err) next (err);
            res.send(200);
        })
    });

    // frontend routes =========================================================

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });

};