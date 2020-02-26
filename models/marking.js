var mongoose    = require('mongoose');

var markingSchema  = mongoose.Schema({
    marking: {
        type: String,
    }
});

var Marking = module.exports = mongoose.model('Marking', markingSchema);

// These are functions to get data from the database. You can even reach the information
// without calling this functions but I just want to show you how you can add some functions
// to your model file to get specific data.

module.exports.getAllMarkings = function(callback){
    Marking.find(callback)
}

module.exports.getMarkingById = function(id, callback){
    Marking.findById(id, callback);
}