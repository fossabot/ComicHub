import * as Koa from 'koa';
const apiTemplate = async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
    await next();
    if (ctx.request.path.startsWith('/api/')) {
        return ctx.res.ok({
            message: `request returned ${ctx.body.counter} ${
                ctx.body.counter > 1 ? 'routes' : 'route'
            }`,
            data: ctx.body.result,
        });
    }
};
export default apiTemplate;
