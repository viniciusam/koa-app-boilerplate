
module.exports.install = (router) => {
    router.get('/', getMessage);
}

async function getMessage(ctx, next) {
    ctx.body = { message: 'Hello world!' };
}
