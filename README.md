# 前端自己的模块化之路

1. script标签要啥引啥
2. AMD规范（require.js）
3. CMD规范 (sea.js)
4. ESM规范 (es6 中出现)
5. commonJS (node.js)

# webpack（打包） 之路

1. 手动压缩。手动打包
2. grunt
3. gulp
4. webpack (最火，最热，用得最多)

# 结合 webpack 搭建起 vue 的开发环境

1. 创建一个项目并初始化 npm init -y
2. 下载项目需要的资源包
  - 生产环境 npm install --save vue
    - vue 
  - 开发环境 npm install --save-dev webpack webpack-cli
    - webpack 
    - webpack-cli
3. 项目根目录下面创建一个 src 文件夹（source意思 源文件），这个文件夹下面放源文件
4. 项目根目录下面创建一个 webpack.config.js （webpack 配置文件）
5. src 下面创建一个 js 文件作为项目的入口文件
6. 配置webpack的文件
7. 简单使用一下
8. 根目录 下面一个 index.html 文件，作为项目的页面入口

## 项目目录结构

- dist         (最终生成的文件-这个文件夹才是最终需要上传到服务器上代码)
- node_modules (放资源包)   该文件是不需要放到服务器上面去的
- src          (源文件，里面放置一些项目自己写得模块。被webpack打包的文件，都需要放到这个文件夹下面)
  - index.js   (项目的打包入口)
- index.html   (项目页面入口)
- package-lock.json （包锁文件）  该文件是不需要放到服务器上面去的
- package.json (项目依赖的资源包与项目的描述信息的文件)  该文件是不需要放到服务器上面去的
- webpack.config.js (webpack的配置文件)
- lab (放第三方的插件 比如jq layui 等 )

？思考上面三个文件，这三个(该文件是不需要放到服务器上面去的)文件都不是真正需要上线（将项目放到服务器）的内容。于是我们需要 webapck 打包（抽取项目中真正的用在前端的内容）。


## webpack 的配置

四大核心 ，模式|入口|出口是必须要配置的。

- 模式      指定这次打包是打的开发环境用的包，还是生产环境用的包 4.x+ 支持的
- 入口      指定webpack需要打包的项目的入口文件
- 出口      打包之后生成的文件需要放到哪个位置
- 加载器    默认情况下，webpack只是简单的打包js文件，如果需要打包 css img 之类的文件，则需要添加相对应的加载器去处理这种类型的文件。
- 插件      插件是加载器干不了的事情，就可以去用插件来干。

如何配置，就是在 webpack.config.js 文件中，暴露一个写用这些选项的对象。
  需要暴露一个对象，注意，这里我用的暴露的方式还是 commonjs 方式   
  module.exports

## 如何调用 webpack 开始打包

命令行中，如果是全局安装就使用 webpack 这个命令
局部安装就执行下面三种方式
- ./node_modules/.bin/webpack
- npx webpack (npm 5.x+ 新增的功能)
- 配置 package.json 的 npm 脚本




## 问题集合？

1. 2行代码打包之后生成了 100行。
  因为 webpack 自身默认让我们的代码能够使用 esm 的功能。

2. 如何将根目录下的 index.html 让其在打包的时候，自动生成到 dist 文件夹下面去。

  使用一款插件：HtmlWebpackPlugin

3. 需要使用的资源都是通过npm的方式去安装的 那如何使用?

vue

npm install --save vue

哪个代码中要使用 vue 就在那里像commonJS 一样 通过一种方式去引入他就ok.
require('')

通过es6 的模块引入方式 (不能var一个变量去接收)

import 'xxx'

import xxx from 'xxx'

4. import Vue from 'vue' ; 引入的vue到底引入的是个啥

  "main": "dist/vue.runtime.common.js",
  "module": "dist/vue.runtime.esm.js",

  1. 具体找到 node_modules 下面的vue文件夹
  2. 找到 package.json 中的 main 和 module 选项的值
  3. 如果 通过 commonJS require 的方式去引入vue.引入的是 main 选项指定的文件.
  4. 如果 通过 esm import 的方式去引入vue .引入的是module 选项指定的文件


5. import Vue from 'vue';默认页面不ok?
  vue.common.js 是用common js规范 require的方式去引入的
  vue.esm.js    是用esm import的方式去引入的

  vue.runtime 运行时的版本    render 函数去渲染模板
  vue.没有runtime  运行时 + 编译器 (完整版)  template

  解决方法: 修改 引入的vue文件为完整版的esm版本
    PS: 请不要直接修改 node_modules下面的vue的package.json 可以通过设置 webpack的别名这个选项来完成
    resolve: { 
    // 别名 可以改路径
    /**
     * 别名:
     *  1. vue/dist/vue.esm.js -> a
     */
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  }

5. 在index.html文件中引入 jq 会报错
  解决方法: 需要用到 CopyWebpackPlugin 这个插件

6. 自动打包 (开发时的打包)

  webpack-dev-server 资源包

  1. npm install --save-dev webpack-dev-server
  2. 配置
    运行下面的命令 会启动一个服务 会自动做一个监听
    npx webpack-dev-server 不会在硬盘中显示(不会在项目中自动生成一个dist文件,但是dist文件夹实际上是存在的,他隐藏了) 是保存在内存中
  3. webpack 启动 换成 webpack-dev-server 启动

7. 引入模块的方式去引入 样式文件 会报错
  加载器 有一个顺序问题需要注意 先是转换成模块 再做解析 但是写代码的时候 需要倒着写
  css-loader 对css文件做转换 转换成 webpack所能识别的模块css文件
  style-loader  对 上一步转换之后的css模块文件 再做解析 解析到页面的 style 标签中去

  1. npm install --save-dev css-loader style-loader
  2. 配置



## 插件的使用
1. 找到需要使用的插件并安装他。注意短横线（开发依赖）
  npm install --save-dev html-webpack-plugin
2. 在 webpack.config.js 中引入他
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  为什么首字母大写 因为webpack的插件都是一个一个的构造函数
3. 在 plugins 选项中调用他，并按照他的文档去做配置。


## 项目中使用 sass

 1. sass是什么?
  css 的预处理语言 能像使用js那样去使用css 可以定义变量了,定义方法了
2. 好处
  1. 写样式会快
  2. 嵌套写法
  .box{}
  .box h1{}
  .box h1 span{}
  .box h1 span a{}

  .box{ 

    h1{

      span{

        a{}
      }
    }
  }
3. 除了 sass 还有 LESS、Stylus、Turbine、Swithch CSS、CSS Cacheer、DT CSS 等等预编译处理器
4. webpack 配置中如何使用sass
  1. 安装 sass-loader (注意: 除了安装sass-loader 还要装node-sass)
    npm install --save-dev sass-loader
    npm install --save-dev node-sass
  2. 配置
  3. 使用
  使用sass 中定义变量和定义方法等更高级的语法 可以做一些网站的换皮肤功能

5. sass 有两个文件名后缀
  .scss (最常用)
  .sacc (大括号可以省略不写)
