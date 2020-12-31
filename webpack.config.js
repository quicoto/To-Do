const path = require('path');

let mode = 'production';

if (process.env.NODE_ENV === 'development') {
  mode = 'development';
}

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'scripts.min.js',
  },
  mode,
};
