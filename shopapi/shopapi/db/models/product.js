const {Schema, SchemaTypes} =  require('../connect');
const mongoose = require('../connect');
const {SCHEMAS} = require('../../utils/config');


const prodSchema = new Schema({
 prodid:{type:SchemaTypes.String, required:true,unique:true},
 prodname:{type:SchemaTypes.String, required:true},
 prodbrand:{type:SchemaTypes.String, required:true},
 prodcategory:{type:SchemaTypes.String, required:true},
 prodprice:{type:SchemaTypes.Number, required:true},
 prodavailable:{type:SchemaTypes.Number, required:true}


},
{timestamps:true}
);

const ProdModel = mongoose.model(SCHEMAS.PRODUCTS,prodSchema);
module.exports = ProdModel;