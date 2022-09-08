const express = require('express');
const mongoose = require('mongoose');

const sender = require('./routers/sender');
const parcel = require('./routers/parcel');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/parcel', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Sender RESTFul endpoionts 
app.get('/sender', sender.getAll);
app.get('/sender/:name', sender.getParcels);
app.post('/sender', sender.createOne);
app.get('/sender/:id', sender.getOne);
app.put('/sender', sender.updateOne);
app.post('/sender/:id/parcel', sender.addParcel);
app.delete('/sender', sender.deleteOne);
app.post('/sender/parcel', sender.addParcel);


//Parcel RESTFul  endpoints
app.post('/parcel', parcel.createOne);
app.get('/parcel/:id', parcel.getOne);
app.put('/parcel/:id', parcel.updateOne);
app.get('/parcel/', parcel.getAddress);
app.put('/parcel', parcel.updateAddress);

/*
app.put('/parcel/inc', parcel.updateIdInc10);
app.put('/parcel/dec', parcel.updateIdDec5);

app.delete('/parcel/id', parcel.deleteId);
app.delete('/parcel/cost', parcel.deleteCost);
app.delete('/parcel/weight', parcel.deleteWeight);
*/
