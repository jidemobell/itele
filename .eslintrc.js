module.exports = {
  extends : "airbnb-base",
  env : {
    "mocha" : true,
  },
  rules: {
    "linebreak-style": 0,
    "consistent-return": 0,
    "arrow-body-style": 0,
    "prefer-destructuring":0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
}