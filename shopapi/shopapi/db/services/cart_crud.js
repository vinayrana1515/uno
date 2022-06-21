const CartModel = require('../models/cart');

module.exports = { 
         add_cart(cartObject){
            let promise = CartModel.create(cartObject);
            return promise;


         },

         async view_cart({cartid}){ 
            const doc = await CartModel.findOne({"cartid":cartid}); 
            if(doc){
              
                   return doc;
                           }
             else{
                 return null;
  
             }

         }

}