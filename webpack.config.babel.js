const path = require('path');

export default () => (
  {
    mode: 'production',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'fullpage-swiper.min.js',
      libraryTarget: 'umd',
      globalObject: 'this',
            // libraryExport: 'default',
      library: 'Fullpage'
    },
    externals: {
      'gsap': {
        commonjs: 'gsap',
        commonjs2: 'gsap',
        amd: 'gsap',
        root: 'gsap'
      },
      'hammerjs': {
        commonjs: 'hammerjs',
        commonjs2: 'hammerjs',
        amd: 'hammerjs',
        root: 'Hammer'
      }
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader'
        }
      ]
    },
  }
);
