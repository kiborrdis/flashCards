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
  },
  "rules": {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/sort-comp": "off",
    "global-require": "off",
  },
}
