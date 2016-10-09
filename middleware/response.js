/*
 * 返回信息中间件
 */
import _ from 'lodash';

export default async (ctx, next) => {
  let data = {
    errno: 0,
    message: '',
    starttime: _.now()
  };

  ctx.success = (result, msg) => {
    data.message = msg || '';
    data.data = result.data;
  }
  ctx.fail = (err) => {
    data.message = err.message || 'System Error!';
    data.errno = err.errno == undefined ? -999 : err.errno;
    data.code = err.code;
    data.error = err;
  }
  await next();
  data.timestamp = _.now();
  ctx.body = data;
}
