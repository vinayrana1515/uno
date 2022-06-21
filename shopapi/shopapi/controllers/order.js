const {SUCCESS, SERVER_ERROR, NOT_FOUND} =require('../utils/config').STATUS_CODES;
const messageBundle =  require('../locales/en');
const orderOperations = require('../db/services/order_crud');

const orderController ={ 

        async details(request,response){
            const order= request.body;
            try{ 
                const doc= await orderOperations.details(order);
        if(doc){ 
            response.status(SUCCESS).json({message: messageBundle["order.found"],doc:doc});

        }
        else { 
            response.status(NOT_FOUND).json({message: messageBundle["order.notfound"]});

        }


            }
            catch(err){ 
                response.status(SERVER_ERROR).json({ 
                    message: messageBundle["order.notfound"]       });

            }



        },
        
        book(request,response){ 
            const orderObject= request.body;      

            const promise= orderOperations.book(orderObject);
            promise.then(doc=>{
                response.status(SUCCESS).json({message: messageBundle["order.book"],doc:doc});
        
            }).catch(err=>{
                response.status(SERVER_ERROR).json({ 
                    message: messageBundle["oredr.fail"]    ,err   });
        
            })




        }

}

module.exports = orderController;


// const  orders = (request, response)=>{ 
//     // const orderId = request.query.orderid; //Query String

//     const orderId = request.params.orderid; //Path parameter
//     response.send(new Date()+ " OrderId Rec "+ orderId);
// };

// const  history = (request, response)=>{ 
//     response.send("HISTORY");
// };
// module.exports = {orders};