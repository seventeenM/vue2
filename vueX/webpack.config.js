var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
var data = require("./data/data.js");
var queryString = require("querystring");
var url = require("url");

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
      rules:[
          {
              test:/\.js$/,
              use:["babel-loader"]
          },{
              test:/\.css$/,
              use:["style-loader","css-loader"]
          },{
              test:/\.html$/,
              use:["html-loader"]
          },{
              test:/\.vue$/,
              use:["vue-loader"]
          },
            {
              test:/\.jpg|.png|gif$/,
              use:["url-loader"]
          }
      ]
    },
    plugins:[
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:"./index.html"
        })
    ],
    devServer:{
        port:3333, 
        host:"localhost", 
        hot:true,
        contentBase:__dirname+"/src/static",
        watchContentBase:true,
        setup(app){
            app.get("/tab",function(req,res){
                // console.log(req.url)
                // res.setHeader('Access-Control-Allow-Origin','*');
                // res.setHeader('content-type','application/json;charset=utf-8');
            //    if(req.url=="/tab"){
            //        res.write(JSON.stringify(data));
            //        res.end();
            //    }

              var $id = queryString.parse(url.parse(req.url).query).id
                 if ($id == 1) {
                    res.json(data);
                } else {
                    res.json({ state: "error" });
                }

            })

            // app.get("/data", function(req, res, next) {
            //     var $id = queryString.parse(url.parse(req.url).query).id
            //     if ($id == 1) {
            //         res.json(data.mxz);
            //     } else {
            //         res.json({ state: "error" });
            //     }
            // })

            app.get("/id", function(req, res, next) {
                res.json({ id: 1 });
            })

        }
    },
    resolve:{
        alias:{
            "vue":"vue/dist/vue.js"
        }
    }
}