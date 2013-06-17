var argo = require('argo');
var surface = require('../');
var configFile = process.env.CONFIG || './surface.conf';
var config = require(configFile);

config.driver = surface.drivers[config.type];

argo()
  .use(function(handle) {
    handle('response', function(env, next) {
      env.response.setHeader('Access-Control-Allow-Origin', '*');
      next(env);
    });
  })
  .use(surface.package(config))
  .listen(process.env.PORT || 3000);
