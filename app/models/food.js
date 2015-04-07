// app/models/food.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our food model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Food', {
    title : {type : String, default: ''}
});