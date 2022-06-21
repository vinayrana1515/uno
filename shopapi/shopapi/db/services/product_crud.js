const ProdModel = require('../models/product');

module.exports = { 
        add_prod(prodObject){ 
            let promise = ProdModel.create(prodObject);
            return promise;
            
        },

        async display_prod(){
            const doc= await ProdModel.find();
            if(doc){ 
                return doc;
            }
            else{
                return null;
            }

        },

        async find_prod({prodid}){ 
            const doc= await ProdModel.findOne({"prodid":prodid});
            if(doc){
              
                return doc;
                        }
          else{
              return null;

          }

        }
}