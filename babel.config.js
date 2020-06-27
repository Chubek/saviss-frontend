module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "alias": {
            "@components": "./components",
            "@config": "./config",
            "@state": "./redux/state",
            "@redux": "./redux",
            "@root" : "./",
            "@wrappers": "./api/wrappers",
            "@api": "./api"
          }
        }
      ]
    ]
  };

};
