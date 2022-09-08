const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {

    getAll: function (req, res) {
        Sender.find(function (err, sender) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(sender);
            }
        });
    },

    getParcels:  function (req, res) {
        Sender.find({'name': req.params.name}).populate('parcel').exec(function (err, sender) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(sender);
            }
        });
    },

    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();

        Sender.create(newSenderDetails, function (err, sender) {
            if (err) return res.status(400).json(err);

            res.json(sender);
        });
    },

    getOne: function (req, res) {
        Sender.findOne({ _id: req.params.id })
            .populate('parcel')
            .exec(function (err, sender) {
                if (err) return res.status(400).json(err);
                if (!sender) return res.status(404).json();
                res.json(sender);
            });
    },


    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body.id }, {'name':req.body.name}, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            res.json(sender);
        });
    },


    deleteOne: function (req, res) {
        Sender.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },


    addParcel: function (req, res) {
        Sender.findOne({ _id: req.body.senderId }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            let parcelUpdate = {'address': req.body.parcel.address, 'weight': req.body.parcel.weight, 'fragile': req.body.parcel.fragile };
            parcelUpdate._id = new mongoose.Types.ObjectId();
            sender.parcel.push(parcelUpdate);

            let parcel = new Parcel(parcelUpdate);

            parcel.sender.push(sender._id);

            parcel.save(function (err) {
                if (err) return res.status(500).json(err);
            });

            sender.save(function (err) {
                if (err) return res.status(500).json(err);

                res.json(sender);
            });
        });
    }
};
