// app/models/notes.js
// grab the mongoose module
var mongoose = require('mongoose');

// define notes model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Note', {
    title : {type : String, default: ''},
    body : {type : String, default: ''}
});