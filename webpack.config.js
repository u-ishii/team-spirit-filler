module.exports = {
  entry: {
    popup: './src/popup.js',
    content_script: './src/content_script.js'
  },
  output: {
    path: __dirname,
    filename: 'extension/dist/[name].js'
  }
};
