import Koa from 'koa';
import KoaBodyParser from 'koa-better-body';
import cors from 'koa-cors';
// koa1中间件转换
import convert from 'koa-convert';

import config from '../config.js';

import response from '../middleware/response.js';

import analyse from '../middleware/analyse.js';

import compare from '../middleware/compare.js';

import Hook from '../utils/hook.js';

import Biz from '../utils/biz.js';

import api from '../router/api.js';

import ping from '../router/ping.js';

import upload from '../router/upload.js';

export default class {
  constructor(){
    let app = new Koa();
    // middleware
    app.use(convert(KoaBodyParser()));
    app.use(convert(cors()));
    app.use(response);
    app.use(analyse);
    app.use(compare);
    app.use(api.routes()).use(api.allowedMethods());
    app.use(ping.routes()).use(ping.allowedMethods());
    app.use(upload.routes()).use(upload.allowedMethods());
    // err handler
    app.on('error', (err, ctx) => {
    	console.error('server error', err, ctx);
    });
    this.app = app;

    this._biz_module = {};
    this._hook = {};
  }

  addBizModules(biz){
    if(biz instanceof Biz){
      let m = biz.convert();
      this._biz_module[m.version] = m.modules;
    }else{
      throw new Error('Biz must be instanceof Biz');
    }
  }

  addHook(hook){
    if(hook instanceof Hook){
      this._hook = hook;
    }else{
      throw new Error('Hook must be instanceof Hook');
    }
  }

  getApp(){
    return this.app;
  }

  run(port){
    global.__biz_module = this._biz_module;
    global.__hook = this._hook;
    this.app.listen(port);
    console.log(`http server listening on port ${port}`);
  }
}
