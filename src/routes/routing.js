const Router = require('koa-router');

module.exports.configure = (app) => {

    let router = new Router({ prefix: '/v1' })
    
    // Every controller configure it's own routes.
    require('./controller/home').install(router);
    
    // Install the routes on the app.
    app.use(router.middleware())
       .use(router.allowedMethods());

};
