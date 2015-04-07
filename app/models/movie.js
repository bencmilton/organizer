// app/models/movie.js
// grab the mongoose module
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Movie;
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    rtObj: Object
    });

Movie = mongoose.model('Movie', MovieSchema);


module.exports = Movie;