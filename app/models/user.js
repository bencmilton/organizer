var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var crypto = require('crypto');

var User;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true},
    hashedPassword: {type: String, required: true},
    moviesLists: [{type: Schema.Types.ObjectId, ref: 'MovieList'}],
    salt: {
        type: String,
        default: makeSalt
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    }
});

//generate salt key
function makeSalt () {
    return crypto.randomBytes(16).toString('base64');
}

//virtual method for automatically setting hashed user passwords
UserSchema.virtual('password')
    .set(function (plaintext) {
        this.hashedPassword = this.hash(plaintext);
    });

//user method that hashes a plain text password
UserSchema.methods.hash = function (plaintext) {
    return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString('base64');
};

//method for comparing user login attempt to stored hashed password
UserSchema.methods.authenticate = function (attempt) {
    return this.hash(attempt) == this.hashedPassword;
};

//initialize deep populate plugin
UserSchema.plugin(deepPopulate,{});

module.exports = mongoose.model('User', UserSchema);