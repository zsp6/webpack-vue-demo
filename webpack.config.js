// 这个就是 webpack 的配置文件

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 需要暴露一个对象, 注意我用的暴露的方式还是 commonJS 方式

module.exports = {
  // 模式
  mode: 'development', // development | production

  // 入口
  entry: './src/index.js',

  // 出口
  output: {
    // 出口的位置 (绝对路径)
    path: path.resolve(__dirname,'./dist'), // 项目根目录下的 dist 文件夹
    filename: 'bundle.js', // 打包之后文件的名字
  },

  // 加载器
  module: {
    // 定义加载器的规则
    rules: [
      {
        test: /\.css$/,
        use: [ // 注意: 要倒着写
          'style-loader',
          'css-loader'
        ]// 要使用什么加载器就去处理这个模板文件
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  
  // 插件
  plugins: [//为啥是s 因为插件能用多个
    // 自动生成一个 html 文件在 出口的位置,并且会自动在这个生成的文件中引入 打包生成的js文件.
    new HtmlWebpackPlugin({
      title: '仨只小猪', // 修改dist文件夹中index.html文件的标题
      filename: 'abc.html',//修改dist文件夹中index.html文件的文件名
      template: './index.html', // 将index.html作为生成的abc.html的模板 用了template title就不会生效 标题还是document  可以直接在index.html文件中修改标题
    }),

    // 拷贝
    new CopyWebpackPlugin([
      {
        from: './lab/jquery.min.js',
        to: 'lib'
      }
    ])
  ],

  // 解析
  resolve: { 
    // 别名 可以改路径
    /**
     * 别名:
     *  1. vue/dist/vue.esm.js -> a
     */
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  
  // webpack-dev-derver 的配置
  devServer: {
    // 配置以哪个文件夹作为web服务的根路径
    contentBase: path.resolve(__dirname,'./dist')
  }
}