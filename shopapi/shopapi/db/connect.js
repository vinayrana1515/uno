const mongoose = require('mongoose');
const dbOptions = { 
    maxPoolSize:5 // 5 connection always active 
}
mongoose.connect(process.env.DB_URL,dbOptions,err=>{ 
    if(err){ 
        console.log("DB connection failed",err);
    }
    else{ 
        console.log('Connection Created...')
    }
});

module.exports = mongoose;
