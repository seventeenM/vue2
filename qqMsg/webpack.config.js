var data = require("./data/data.js");


module.exports = {
    entry: {
        aa: __dirname + "/data/data.js",
    },
    devServer: {
        port:8888,
        host:"127.0.0.1",
        setup(app){
            app.post("/tab",function(req,res){
                // console.log(req.url)
                res.setHeader('Access-Control-Allow-Origin','*');
                res.setHeader('content-type','application/json;charset=utf-8');
               if(req.url=="/tab"){
                   res.write(JSON.stringify(data));
                   res.end();
               }
            })
        }
    }
}