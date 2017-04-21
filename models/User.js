'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    email: {
        type: String,
        default: 0
    },
    password: {
        type: String,
        default: 0
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;