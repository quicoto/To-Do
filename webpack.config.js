let mode = 'production';

if (process.env.NODE_ENV === 'development') {
  mode = 'development';
}

module.exports = {
  mode,
};
