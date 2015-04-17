var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var User;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    moviesLists: [{type: Schema.Types.ObjectId, ref: 'MovieList'}]
    //moviesLists: [Schema.Types.MovieList]
});

UserSchema.plugin(deepPopulate,{});

User = mongoose.model('User', UserSchema);


module.exports = User;