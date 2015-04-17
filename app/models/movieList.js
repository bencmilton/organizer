var mongoose = require('mongoose');

var MovieList;
var Schema = mongoose.Schema;

var MovieListSchema = new Schema({
    listName: String,
    //movies: [Schema.Types.Movie]
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}]

});

MovieList = mongoose.model('MovieList', MovieListSchema);


module.exports = MovieList;