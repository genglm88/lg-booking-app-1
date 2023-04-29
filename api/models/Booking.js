const mongoose = require('mongoose')
//const {Schema} = mongoose

const bookingSchema = new mongoose.Schema ({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'}, //place id
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required: true},
    numberOfGuests: {type:Number,required:true},
    name: {type:String,required:true},
    mobile: {type:String, required:true},
    price: Number,
}) 

module.exports =  mongoose.model('Booking', bookingSchema)
