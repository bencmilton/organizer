var mongoose = require('mongoose');

var MovieList;
var Schema = mongoose.Schema;

var MovieListSchema = new Schema({
    listName: String,
    //movies: [Schema.Types.Movie]
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}]

});

//removal middleware cleans up reference in User model on removal
MovieListSchema.pre('remove', function(next){
    User.remove({moviesLists: this._id}).exec();
    next();
});

MovieList = mongoose.model('MovieList', MovieListSchema);


module.exports = MovieList;