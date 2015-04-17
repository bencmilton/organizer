// app/models/movie.js
// grab the mongoose module
var mongoose = require('mongoose');

var Movie;
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    rtObj: Object
    });

Movie = mongoose.model('Movie', MovieSchema);


module.exports = Movie;