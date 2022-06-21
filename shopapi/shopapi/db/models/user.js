const {Schema, SchemaTypes} =  require('../connect');
const mongoose = require('../connect');
const {SCHEMAS} = require('../../utils/config');
const userSchema =  new Schema( { 
    emailid:{type:SchemaTypes.String,required:true, unique:true},
    password:{type:SchemaTypes.String,required:true, min:4, max:15},
    name:{type:SchemaTypes.String,required:true}
},
{timestamps:true}
);
const UserModel= mongoose.model(SCHEMAS.USERS, userSchema) // collection name users
module.exports = UserModel;

