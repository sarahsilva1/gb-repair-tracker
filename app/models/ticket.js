var mongoose = require('mongoose');

module.exports = mongoose.model('Ticket', {
    text: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        default: ''
    }
});
