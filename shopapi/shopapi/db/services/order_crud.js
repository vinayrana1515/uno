const OrderModel = require('../models/order');

module.exports= { 
    
        async details({userid}){
            const doc = await OrderModel.find({"userid":userid})
                if(doc){
                    return doc;
                }

                else {
                    return null;
                }

        },

        book(orderObject){

              let promise = OrderModel.create(orderObject);
              return promise;

        }

}