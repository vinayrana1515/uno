const { response } = require('express');
const express =  require('express');
const app = express(); // call express function it return app fn
// it create new app for our application
const cors=require('cors');
//to use static content //  app.use(middleware); middleware is a fn
app.use(express.static('public')); 
require('dotenv').config() ;

app.use(express.json()); // handle json {key:value}
app.use(express.urlencoded()); // handle url encoded key=value&key=value

const {ROOT} = require('./utils/config').ROUTES;
app.use(cors());
app.use(ROOT,require('./api/routes/user'));
app.use(require('./utils/middlewares/auth'));


app.use(ROOT,require('./api/routes/product'));

app.use(ROOT,require('./api/routes/order'));
app.use(ROOT,require('./api/routes/cart'));


app.use(require('./utils/middlewares/404'));
// structure your code.. code modularity app.get in separate routes folder
 
//to up app on port no. generally greater than 1024 as below are reserved
// const server=app.listen(9999,(err)=>{
    const server=app.listen(process.env.PORT || 1234,(err)=>{
    if(err){ 
        console.log("App Crash", err);
    }
    else { 
        console.log("Server Started... " , server.address().port);
    }
});
