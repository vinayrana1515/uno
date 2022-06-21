const {NOT_FOUND} = require('../config').STATUS_CODES;
const messageBundle=require('../../locales/en');
const jwt = require('../token');
module.exports = ( request, response , next)=>{ 
    if(request.headers['authorization']){ 
        let tokenId = request.headers['authorization'];
           if(jwt.verifyToken(tokenId)){ 
               next();// next route
           }

           else{ 
            response.status(NOT_FOUND).json({message:messageBundle['auth.fail']});
           }

    }
    else{
        response.status(NOT_FOUND).json({message:messageBundle['auth.fail']});
    }
}