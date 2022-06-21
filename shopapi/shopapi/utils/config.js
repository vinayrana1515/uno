module.exports = { 
    SCHEMAS :{ 
        USERS:"users",
        CART:"cart",
        PRODUCTS:"products",
        ORDERS:"orders"
    },
    STATUS_CODES :{
        SUCCESS:200,
    SERVER_ERROR:500,
    FILE_NOT_FOUND:404,
    NOT_FOUND:404
    },
    ROUTES:{      
        ROOT :'/',
        USER:{
            LOGIN:'/login',
            REGISTER:'/register',
            PROFILE:'/show',
        } ,
    ORDER: { 
           DETAILS:'/orders',
           BOOK:'/book',
       } ,
    CART: { 
           ADD_CART:'/cartadd',
           VIEW_CART:'/cartview',
       },
    PRODUCTS:{
           ADD_PROD:'/add_prod',
           DISPLAY_PROD:'/display_prod',
           FIND_PROD:'/find_prod',
       }
    }
} 