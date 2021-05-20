const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//creategeolocation Schema 
const GeoSchaema = new Schema({
    type: {
    type: String,
    default: "Point"
    },
    coordinates: {
        type : [Number],
        index:"2dsphere"

    }
});


//create parceiro Schema e model
const ParceiroSchema =  new Schema({
    name: {
        type: String,
        required:[true,'Name field is required']
    },
    tradingName:{
        type: String,
        required:[true,'Name field is required']
    },
    document:{
        type: String,
        required:[true,'Document field is required']
    },
    ownerName:{
        type: String,
        required:[true,'Owner Name  field is required']
    },

   address: GeoSchaema,
    
  });
const Parceiros = mongoose.model('parceiros',ParceiroSchema);

module.exports = Parceiros;
