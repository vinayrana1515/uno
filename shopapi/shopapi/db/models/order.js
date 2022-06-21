const {Schema, SchemaTypes} =  require('../connect');
const mongoose = require('../connect');
const {SCHEMAS} = require('../../utils/config');


const orderSchema = new Schema({
 orderid:{type:SchemaTypes.String, required:true,unique:true},
 userid:{type:SchemaTypes.String,required:true},
 orderdate:{type:SchemaTypes.Date, require:true},
 details:{prodid:{
     type:SchemaTypes.String, required:true
 },
 qty:{ 
     type:SchemaTypes.String, required:true
 }

}


});

const OrderModel = mongoose.model(SCHEMAS.ORDERS,orderSchema);
module.exports = OrderModel;