const mongoose = require('mongoose');

const BloodChargesSchema = new mongoose.Schema({
    CBC :{
        type: Number
    },
    Bilirubin :{
        type : Number
    },
    Platelet :{
        type : Number
    }
})

const BloodCharges = new mongoose.model("BloodCharge", BloodChargesSchema);
module.exports = BloodCharges;