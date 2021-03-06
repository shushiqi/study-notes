## 模块化
1. 由于web应用正变得更加复杂与庞大，前端技术也更加广泛，传统的HTML、CSS和JS开发的方式显然已经无法应对这种发展，于是出现了许多新思想，模块化是其中非常重要的一环。
2. 模块化是指把一个复杂的系统分解到多个模块以方便编码。
3. JS模块化规范
    - CommonJS，通过`require`方法同步加载依赖模块，通过`module.exports`导出。Node.js采用的就是CommonJS规范
        - 优点：可在Node.js环境下复用、NPM发布的许多第三方模块采用的是CommonJS模块
         - 缺点：无法在浏览器环境下运行，需通过工具转换成标准ES5代码
    - AMD，异步加载依赖模块，目的是为了解决针对浏览器环境的模块化问题，最具代表性的实现是[require.js](https://requirejs.org/ "require.js网址")
        - 采用 AMD 导入及导出时的代码如下：
        ```js
        // 定义一个模块
        define('module', ['dep'], function(dep) {
         return exports;
        });

        // 导入和使用
        require(['module'], function(module) {
        });
        ```
        - 优点：可不转换代码直接在浏览器中运行、可异步加载、可并行加载多个依赖
        - 缺点： JS运行环境原生不支持AMD，需先导入实现了AMD的库
    - ES6模块化，是ECMA提出的JS模块化规范。
        - 优点：浏览器和服务器通用
        - 缺点：ES6无法直接运行在大部分JS运行环境下，需转换成标准ES5
4. webpack 
    - 许多新思想和框架都非常优秀，但他们都有一个共同点，源代码无法直接运行，需转换后才可以正常运行。构建所作的事情就是，将源代码转换成线上可执行的HTML、CSS和JS代码。它通常包含以下内容：
        - 代码转换
        - 文件优化：压缩代码、图片等
        - 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
        - 模块合并
        - 自动刷新： 开发时监听源代码变化、自动构建刷新浏览器内容
        - 代码校验
        - 自动发布
    - 核心概念
        - **entry** webpack构建入口，构建过程将从entry开始，获取相关依赖并进行构建
        - **module** 在webpack中，一切皆模块，一个模块对应一个文件
        - **chunk** 代码块，由多个模块组合而成，用于代码合并与分割
        - **loader** 模块转换器
        - **plugin** 插件，在webpack构建过程的特定时机注入扩展逻辑执行
        - **output** 输出结果，转换成功后获得的代码
    - webpack事件流
     > webpack启动后从`entry`里获取配置的`module`解析相关依赖，根据`loader`匹配对应的模块进行转换，一个`entry`和其相关的依赖`module`会被分到同一个组打包成`chunk`，最后转换成文件输出到`output`。在整个过程中，webpack在恰当的实际执行`plugin`里的逻辑
5. webpack常用配置项实践
   - entry 
    ```js
     <!-- webpack.config.js -->
    const path = require("path")
    module.exports = {
        entry: "./main.js"
        ... // 省略其他配置

        ]
    }
    ```
   - output
    ```js
    const path = require("path")
    module.exports = {
    ... // 省略其他配置
     output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "./dist")
        },
    }
    ```
   - css文件处理
     ```js
    const path = require("path")
    const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Plugin插件：将css文件提取到单独文件中
    module.exports = {
        ... // 省略其他配置
         module: {
        rules: [{
                test: /\.css$/, //匹配css文件类型
                // use: ['style-loader', 'css-loader?minimize'], //？传入参数方式 mizimize参数，开启css压缩
                // 或使用对象方式传入参数
                // use: ['style-loader', {
                //     loader: 'css-loader',
                //     options: {
                //         minimize: true
                //     }
                // }]
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
        ]
    }
    ```
   - resolve 解析，配置模块如何被解析
        -  alias，设置引入路径别名
         ```js
        const path = require("path")
        module.exports = {
            ... // 省略其他配置
           resolve:{
               alias: {
                components: "./src/components/"
            }
           }
        }
        ``` 
    - plugin 插件
        - html-webpack-plugin 自动引入生成的js及css文件
         ```js
        const path = require("path")
        const HtmlWebpackPlugin = require('html-webpack-plugin')
        module.exports = {
            ... // 省略其他配置
            plugins:[
               new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./src/index.html"),
                }),
            ]
        }
        ```
      - clean-webpack-plugin  清除上次打包时残留的文件
        ```js
        const path = require("path")
        const { CleanWebpackPlugin } = require('clean-webpack-plugin')        
        module.exports = {
            ... // 省略其他配置
            plugins:[
               new CleanWebpackPlugin()
            ]
        }
        ```