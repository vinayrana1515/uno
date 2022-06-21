const {Schema, SchemaTypes} =  require('../connect');
const mongoose = require('../connect');
const {SCHEMAS} = require('../../utils/config');

const productsSchema = new Schema({ 
    prodid:{type:SchemaTypes.String, required:true},
    qty:{type:SchemaTypes.Number,required:true},

});

const cartSchema =  new Schema( { 
    cartid:{type:SchemaTypes.String,required:true, unique:true},
//    products:{type:SchemaTypes.String,required:true},
     products:[productsSchema]
   
},
{timestamps:true}
);

const CartModel = mongoose.model(SCHEMAS.CART,cartSchema);
module.exports = CartModel;


