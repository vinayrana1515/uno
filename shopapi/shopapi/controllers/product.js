const messageBundle =  require('../locales/en');
const {SUCCESS, SERVER_ERROR, NOT_FOUND} =require('../utils/config').STATUS_CODES;
const prodOperations= require('../db/services/product_crud')

const prodController= { 
     
    add_prod(request,response){

        const prodObject = request.body;

        const promise= prodOperations.add_prod(prodObject);
        promise.then(doc=>{
            response.status(SUCCESS).json({message: messageBundle["prod.added"],doc:doc});
    
        }).catch(err=>{
            response.status(SERVER_ERROR).json({ 
                message: messageBundle["prod.notadded"]    ,err   });
    
        })
    

    }  ,

    async display_prod(request,response){ 

        
        try{ 
        const doc= await prodOperations.display_prod();
        if(doc){ 
            response.status(SUCCESS).json({message: messageBundle["prod.found"],doc:doc});

        }
        else { 
            response.status(NOT_FOUND).json({message: messageBundle["prod.fail"]});

        }
    }
    catch(err){ 
        response.status(SERVER_ERROR).json({ 
            message: messageBundle["prod.fail"]       });
        

    }
        

    }, 
    
    async find_prod(request,response){ 
                
           const prod=request.body;
          
         
       try{ 
            const doc= await prodOperations.find_prod(prod);
            if(doc){ 
                response.status(SUCCESS).json({message: messageBundle["prod.found"],doc:doc});
    
            }
            else { 
                response.status(NOT_FOUND).json({message: messageBundle["prod.fail"]});
    
            }
        }
        catch(err){ 
            response.status(SERVER_ERROR).json({ 
                message: messageBundle["prod.fail"]    });
                console.log(err);
            
    
        }



    }

}

module.exports = prodController;