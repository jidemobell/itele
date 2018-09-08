module.exports = {
  extends : "airbnb-base",
  env : {
    "mocha" : true,
  },
  rules: {
    "linebreak-style": 0,
    "consistent-return": 0,
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
}