// if no name specified always use at last
// app.get('*', (request ,response)=>{ 
//     response.send("oops wrong url typed")
// })
module.exports = function(request, response){ 
    response.send("Oops wrong url entered");
}