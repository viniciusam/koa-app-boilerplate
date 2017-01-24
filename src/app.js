require('babel-polyfill');

// https://gist.github.com/branneman/8048520
global.app_require = (path) => require(__dirname + '/' + path);

const debug = require('debug')('app:main');
const Koa = require('koa');
const app = new Koa();
const compress = require('koa-compress');
const bouncer = require('koa-bouncer');

// Validation middleware.
app.use(bouncer.middleware());

// Compression middleware.
app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));

// Log middleware.
app.use(async (ctx, next) => {
    var start = new Date;
    await next();
    var ms = new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

// Error middleware.
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        debug(err);

        // Validation errors.
        if (err instanceof bouncer.ValidationError) {
            err.status = 400;
        }

        ctx.status = err.status || 500;
        if (ctx.status != 500) {
            ctx.body = {
                message: err.message
            };
        }
    }
});

require('./routes/routing').configure(app);

module.exports = app;
