const { fork } = require('child_process');
const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();

const home = new Router();


// 创建异步线程
function createPromisefork(childUrl, data) {
  // 加载子进程
  const res = fork(childUrl);
  // 通知子进程开始work
  data && res.send(data);
  return new Promise((resolve) => {
    res.on('message', (f) => {
      resolve(f);
    });
  });
}


// 子路由1
home.get('/', async( ctx ) => {
  // 通知子进程开始执行任务,并传入数据
  const res = await createPromisefork(path.resolve(__dirname, './run.js'), [1, 2]);
  ctx.body = res;
});
// 装载所有子路由
const router = new Router();
router.use('/', home.routes(), home.allowedMethods());
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
