const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {

    getAll: function (req, res) {
        Parcel.find(function (err, parcel) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(parcel);
            }
        });
    },

    getParcels: function (req, res) {
        Parcel.find({ 'name': req.params.name }, 'parcel').populate('parcel').exec(function (err, parcel) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(parcel);
            }
        });
    },

    createOne: function (req, res) {
        let newParcelDetails = req.body;
        newParcelDetails._id = new mongoose.Types.ObjectId();

        Parcel.create(newParcelDetails, function (err, parcel) {
            if (err) return res.status(400).json(err);

            res.json(parcel);
        });
    },

    getOne: function (req, res) {
        Parcel.findOne({ _id: req.params.id })
            .populate('parcel')
            .exec(function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                res.json(parcel);
            });
    },

    getAddress: function (req, res) {
        Parcel.find({ 'address': req.query.address })
            .populate('sender')
            .exec(function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                res.json(parcel);
            });
    },


    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body.id }, { 'name': req.body.name }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            res.json(sender);
        });
    },

    updateAddress: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body.id }, { 'address': req.body.address }, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();

            res.json(parcel);
        });
    },

    addParcel: function (req, res) {
        Sender.findOne({ _id: req.body.senderId }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            Parcel.findOne({ _id: req.body.parcelId }, function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();

                sender.parcels.push(parcel._id);
                sender.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(sender);
                });
            })
        });
    }

/*
    updateIdInc10: function (req, res) {
        Parcel.findById(mongoose.Types.ObjectId(req.body.id), function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();
            
            
            Parcel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id) }, { 'cost': parcel.cost + 10 }, function (err, parcels) {
            if (err) return res.status(400).json(err);
            if (!parcels) return res.status(404).json();
            
            res.json(parcels);
            });
            
        });

    }


    updateIdDec5: function (req, res) {
        Parcel.findById(mongoose.Types.ObjectId(req.body.id), function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();
            
            
            Parcel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id) }, { 'cost': parcel.cost - 5 }, function (err, parcels) {
            if (err) return res.status(400).json(err);
            if (!parcels) return res.status(404).json();
            
            res.json(parcels);
            });
            
        });
    },


    deleteId: function (req, res) {
        Parcel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },


    deleteCost: function (req, res) {
        Parcel.deleteMany({ "cost": req.body.cost }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },


    deleteWeight: function (req, res) {
        Parcel.findOneAndRemove({ "weight": req.body.weight }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
*/

};