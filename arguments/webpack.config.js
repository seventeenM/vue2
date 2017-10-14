var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
var queryString = require("querystring");
var url = require("url");

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        chunkFilename: "[name].js"
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
              test:/\.jpg|.png|.gif$/,
              use:["url-loader"]
          },
            {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
               name: '[name].[ext]?[hash]'
            }
        }   
      ]
    },
	devtool: "cheap-module-eval-source-map",
    plugins:[
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:"./index.html"
        }),
		new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common"
        })
    ],
    devServer:{
        port:3333, 
        host:"localhost", 
        hot:true,
        contentBase:__dirname+"/src/static",
        watchContentBase:true,
        setup(app){
            //  app.get("/tableData",function(req,res,next){
                
            //  })
        },
         proxy: {
            "/api": "http://localhost:9999"
        }
    },
    resolve:{
        alias:{
            "vue":"vue/dist/vue.js"
        }
    }
}