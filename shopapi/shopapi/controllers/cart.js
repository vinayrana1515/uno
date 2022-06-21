const {SUCCESS, SERVER_ERROR, NOT_FOUND} =require('../utils/config').STATUS_CODES;
const messageBundle =  require('../locales/en');
const cartOperations = require('../db/services/cart_crud');

const cartController={
    
    
add_cart(request,response){ 

   
    const cartObject = request.body;

    const promise= cartOperations.add_cart(cartObject);
    promise.then(doc=>{
        response.status(SUCCESS).json({message: messageBundle["cart.added"],doc:doc});

    }).catch(err=>{
        response.status(SERVER_ERROR).json({ 
            message: messageBundle["cart.notadded"]       });

    })



            },





async view_cart(request,response){
             
                const cart= request.body;
        try{ 
        const doc= await cartOperations.view_cart(cart);
        if(doc){ 
            response.status(SUCCESS).json({message: messageBundle["cart.found"],doc:doc});

        }
        else { 
            response.status(NOT_FOUND).json({message: messageBundle["cart.fail"]});

        }
    }
    catch(err){ 
        response.status(SERVER_ERROR).json({ 
            message: messageBundle["cart.fail"]       });
        

    }


            }
}

module.exports = cartController;