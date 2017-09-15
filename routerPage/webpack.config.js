var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");

var arr=[
           {
             src:"img/a.jpg",
             name:"音乐"
           },{
             src:"img/b.jpg",
             name:"广播剧"
           },{
             src:"img/c.jpg",
             name:"有声小说"
           },{
             src:"img/d.jpg",
             name:"电台"
           }
         ]
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
              test:/\.jpg$/,
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
            app.get("/getData",function(req,res){
                res.json(arr);
            })
        }
    },
    resolve:{
        alias:{
            "vue":"vue/dist/vue.js"
        }
    }
}