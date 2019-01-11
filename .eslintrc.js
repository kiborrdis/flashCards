module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "settings": {
    'import/resolver': {
      alias: {
        map: [
          ['shared', './src/shared'],
        ],
      }
    }
  }
}