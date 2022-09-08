const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        validate: {
            validator: function (newName) {
                return newName.length >= 3;
            },
            message: 'Name must be at least 3 characters'
        }, 
        type: String,
        required: true
    },
    parcel: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Parcel'
    }]
});
module.exports = mongoose.model('Sender', senderSchema);