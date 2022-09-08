const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Sender'
    }],
    address: {
        validate: {
            validator: function (newAddress) {
                return newAddress.length >= 3;
            },
            message: 'Address must be at least 3 characters'
        },
        type: String,
        required: true
    },
    weight: {
        validate: {
            validator: function (newWeight) {
                return newWeight >=0;
            },
            message: 'Weight must be at least 0'
        },
        type: Number,
        required: true
    },
    fragile: {
        type: Boolean,
        required: true
    }
    /*
    cost: {
        type: Number,
        validate: {
            validator: function (newCost) {
                return newCost >=0;
            },
            message: 'Cost must be at least 0'
        },
        required: true
    }
    */
});
module.exports = mongoose.model('Parcel', parcelSchema);
