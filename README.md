# React Set Up without `create-react-app`

I'm using [this medium article](https://medium.com/swlh/a-complete-webpack-setup-for-react-e56a2edf78ae) as a reference.

## Configuring Webpack
Webpack is a static module bundler for javascript which basically means it processes all the files you've written then bundles your code up into (usually) a single file to serve to the site. Further, the bundler ensures files are served to the site in the right order so everything functions. 

## Using Babel
Babel is a loader. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph. Babel is a third party library that is used to convert ECMAScript 2015+ code into a backward-compatible version of JavaScript in current and older browsers or environments.

- babel/core: The core babel library
- babel/preset-env: Is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)This is also known as browser polyfills
- babel/preset-react: Transform React JSX into regular JavaScript code
- babel-loader: Webpack loader helper

### Step 1: Create a `webpack.config.js` file
The `entry` field specifies the entry point or start for webpack to build dependency graph
The `output` field tells webpack where to emit the bundles it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file

```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  mode: "production"
};
```

### Step 2: Initialize
Run `npm init -y` to download dependencies. This will create a `package.json` file

### Step 3: Adding more dependencies
Install webpack, CLI and the development server for testing by running:  
```
npm install --save-dev webpack webpack-cli webpack-dev-server
```   
Install React and React DOM as dependencies by running:  
```
npm install react react-dom
``` 
Install Core and JavasScipt Loaders by running:  
```
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react
```    
Install css loaders by running:  
```
npm install --save-dev css-loader style-loader postcss-loader --save-dev 
``` 
Install image loader by running:
```
npm install --save-dev file-loader url-loader
```  
Finally install some plug-ins:  
```
npm install --save-dev autoprefixer
npm install --save-dev html-webpack-plugin
```

Running these commands should also automatically update the package.json file created in the previous step. If for some reason it doesn't add `--save` to force it to be added to your local development env

### Step 4: Project File Structure
Create a `src` folder and put your project files there

### Step 5: `.babelrc`

Create a `.babelrc` file in the project folder root to configure how Babel behaves. Babel will automatically look for this file  on startup.

### Step 6
Inside scripts section of `package.json` include start and build script directions. 
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --hot --mode development",
    "build": "webpack --mode production"
  }
```

### Step 7
Update webpack.config.js to look like this:  
```
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },														
                            sourceMap: true
                        }
                     },
                     { 
                         loader: 'postcss-loader',
                         options: {
                             ident: 'postcss',
                             plugins: () => [
                                 autoprefixer({})
                             ]
                         }
                      }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=10000&name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
```

### Step 8: Run Project
```
npm run start
```
