let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let AssignmentSchema = Schema({
    id: String,
    dueDate: Date,
    title: String,
    isDone: Boolean
});


AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
