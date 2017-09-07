var data = require("./data/data.js");


module.exports = {
    entry: {
        aa: __dirname + "/a.js",
    },
    output: {
        path: __dirname + "/list",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    devServer: {
        port:8888,
        host:"127.0.0.1",
        setup(app){
            app.get("/tab",function(req,res){
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